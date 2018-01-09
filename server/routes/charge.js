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

const saveCharge = async (params) => {
  const { err, charge, userID, eventID } = params;
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

const handleCharge = (params, cb) => {
  const { price, stripeToken, userID, eventID } = params;
  stripe.charges.create({
    amount: price,
    currency: 'jpy',
    description: 'Example charge',
    source: stripeToken.id,
  },
  async (err, charge) => {
    const result = await saveCharge({ err, charge, userID, eventID });
    console.log('charge result', result);
    cb(result);
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
    sendRes(res, RES_STAT.OK.CODE, result);
  } catch (err) {
    console.log('err', err);
    sendRes(res, RES_STAT.INTL_SERVER_ERR.CODE, RES_STAT.INTL_SERVER_ERR.MSG);
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

  // TODO check proper error handling
  if (!(userID && price)) {
    sendRes(res, RES_STAT.BAD_REQ.CODE, RES_STAT.BAD_REQ.MSG);
    return;
  }

  // Charge the user's card:
  const args = { price, stripeToken, userID, eventID };
  handleCharge(args, (response) => {
    sendRes(res, RES_STAT.OK.CODE, response);
  });
});

module.exports = router;
