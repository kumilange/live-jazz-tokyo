const { JWT_KEY, JWT_APP, STRIPE_KEY, STAT_TYPE } = require('../config/const');
const knexConfig = require('../../knexfile');
const { sendRes } = require('../utils/');

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
    console.log('verified jwt', req.headers.bearer);
    const decodedJWT = verifyJwt(req.headers.bearer);

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
    console.log('result', result);

    sendRes(res, STAT_TYPE.OK.CODE, result);
  } catch (err) {
    console.log('err', err);
    sendRes(res, STAT_TYPE.INTERNAL_SERVER_ERROR.CODE, STAT_TYPE.INTERNAL_SERVER_ERROR.MESSAGE);
  }
});

router.post('/', async (req, res) => {
  const tokenID = req.body.stripeToken.id;
  const eventID = req.body.eventID;
  console.log('charge jwt', req.headers.bearer);
  const decodedJWT = verifyJwt(req.headers.bearer);

  const user = await db('user')
    .where({ email: decodedJWT.email })
    .select('id')
    .first();

  const { price } = await db('event')
    .select('price')
    .where('id', eventID)
    .first();
  console.log('price', price);

  if (!price) {
    sendRes(res, STAT_TYPE.BAD_REQUEST.CODE, STAT_TYPE.BAD_REQUEST.MESSAGE);
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
    sendRes(res, STAT_TYPE.OK.CODE, response);
  });
});

module.exports = router;
