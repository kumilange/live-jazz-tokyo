const { JWT_KEY, JWT_APP, STRIPE_KEY } = require('../config/const');
const knexConfig = require('../../knexfile');

const express = require('express');
const jsonWebToken = require('jsonwebtoken');
const db = require('knex')(knexConfig);
const stripe = require('stripe')(STRIPE_KEY);

const router = express.Router();

const verifyJwt = (jwt) => {
  return jsonWebToken.verify(jwt, JWT_KEY, {
    issuer: JWT_APP,
  });
};

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
        'event.id as eventId',
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
  console.log('CHARGE JWT', req.headers.bearer);
  const decodedJWT = verifyJwt(req.headers.bearer);

  const user = await db('user')
    .where({ email: decodedJWT.email })
    .select('id')
    .first();

  const [{ price }] = await db('event')
    .select('price')
    .where('id', eventID);

  if (!price) {
    res.status(400).json({ status: 'error', message: 'Event not found.' });
  }

  // Charge the user's card:
  stripe.charges.create({
    amount: price,
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
          user_id: user.id,
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
