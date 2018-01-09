const { JWT_KEY, JWT_APP, STRIPE_KEY, RES_STAT } = require('../config/const');
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

const formatArg = (price, tokenID) => {
  return {
    amount: price,
    currency: 'jpy',
    description: 'Example charge',
    source: tokenID,
  };
};

const handleChargeRes = async (args) => {
  const { err, charge, userID, eventID } = args;
  if (err) {
    return { OK: false };
  }
  const [result] = await db('transaction')
    .returning('id')
    .insert({
      event_id: eventID,
      total: charge.amount,
      charge_id: charge.id,
      user_id: userID,
    });
  console.log('result', result);
  return {
    OK: true,
    order_id: result,
  };
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
    sendRes(res, RES_STAT.OK.CODE, result);
  } catch (err) {
    console.log('err', err);
    sendRes(res, RES_STAT.INTERNAL_SERVER_ERROR.CODE, RES_STAT.INTERNAL_SERVER_ERROR.MESSAGE);
  }
});

router.post('/', async (req, res) => {
  const { stripeToken, eventID } = req.body;
  console.log('charge jwt', req.headers.bearer);
  const decodedJWT = verifyJwt(req.headers.bearer);

  const userID = (await db('user')
    .where({ email: decodedJWT.email })
    .select('id')
    .first())
    .id;
  console.log('userID', userID);

  const { price } = await db('event')
    .select('price')
    .where('id', eventID)
    .first();
  console.log('price', price);

  if (!(userID && price)) {
    sendRes(res, RES_STAT.BAD_REQUEST.CODE, RES_STAT.BAD_REQUEST.MESSAGE);
    return;
  }

  // Charge the user's card:
  stripe.charges.create(
    formatArg(price, stripeToken.id),
    async (err, charge) => {
      const args = { err, charge, userID, eventID };
      const response = await handleChargeRes(args);
      sendRes(res, RES_STAT.OK.CODE, response);
    });
});

module.exports = router;
