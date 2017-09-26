const express = require('express');
const JsonWebToken = require('jsonwebtoken');
const stripe = require('stripe')('sk_test_BQokikJOvBiI2HlWgH4olfQ2');

const router = express.Router();
const knex = require('knex');
const knexConfig = require('../../knexfile');

const db = knex(knexConfig);

const JWT_KEY = process.env.JWT_KEY || 'TEST_KEY';
const JWT_APP = process.env.JWT_APP || 'TEST_APP';

function verifyJwt(jwtString) {
  return JsonWebToken.verify(jwtString, JWT_KEY, {
    issuer: JWT_APP,
  });
}

router.get('/', async (req, res) => {
  try {
    const decodedJWT = verifyJwt(req.headers.bearer);
    console.log('verified jwt', verifyJwt(req.headers.bearer));
    const result = await db('transaction')
      .leftJoin('user', 'transaction.user_id', 'user.id')
      .leftJoin('event', 'transaction.event_id', 'event.id')
      .where({ email: decodedJWT.email })
      .select(
        'transaction.id as id',
        'event.name as title',
        'transaction.total as amount',
      );

    console.log(result);

    res.status(200).json(result);
  } catch (err) {
    res.status(500);
    console.log(err);
  }
});

router.post('/', async (req, res) => {
  const tokenID = req.body.stripeToken.id;
  const eventID = req.body.eventID;
  const decodedJWT = verifyJwt(req.headers.bearer);

  const userID = await db('user')
    .where({ email: decodedJWT.email })
    .select('id')
    .first();

  // Charge the user's card:
  stripe.charges.create({
    amount: 1000,
    currency: 'jpy',
    description: 'Example charge',
    source: tokenID,
  }, async (err, charge) => {
    let response;
    if (err) {
      response = {
        OK: false,
      };
    } else {
      const result = await db('transaction')
        .returning('id')
        .insert({
          event_id: eventID,
          total: charge.amount,
          charge_id: charge.id,
          user_id: userID,
        });
      response = {
        OK: true,
        order_id: result[0],
      };
    }
    res.status(200).json(response);
  });
});

module.exports = router;
