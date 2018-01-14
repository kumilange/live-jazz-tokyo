const { JWT_KEY, JWT_APP, STRIPE_KEY, RES_STAT } = require('../config/const');
const knexConfig = require('../../knexfile');
const { sendResponse } = require('../utils/');

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

const createStripeParam = (price, stripeToken) => {
  return {
    amount: price,
    currency: 'jpy',
    description: 'Example charge',
    source: stripeToken.id,
  };
};

const createQueryObj = (userId, eventId, charge) => {
  return {
    event_id: eventId,
    total: charge.amount,
    charge_id: charge.id,
    user_id: userId,
  };
};

const handleCharge = (params, cb) => {
  const { price, stripeToken, userId, eventId } = params;
  stripe.charges.create(
    createStripeParam(price, stripeToken),
    async (err, charge) => {
      let result;
      if (err) {
        result = { OK: false };
      } else {
        const [transactionId] = await db('transaction')
          .insert(createQueryObj(userId, eventId, charge))
          .returning('id');
        console.log('transactionId', transactionId);
        result = {
          OK: true,
          order_id: transactionId,
        };
      }
      cb(result);
    });
};

/* GET charge */
router.get('/', async (req, res) => {
  try {
    console.log('verified jwt', req.headers.bearer);
    const decodedJWT = verifyJwt(req.headers.bearer);

    const transactions = await db('transaction')
      .innerJoin('user', 'transaction.user_id', 'user.id')
      .innerJoin('event', 'transaction.event_id', 'event.id')
      .where({ email: decodedJWT.email })
      .select(
        'transaction.id as id',
        'event.name as title',
        'event.id as eventId',
        'transaction.total as amount',
      );
    console.log('transactions', transactions);
    sendResponse(res, RES_STAT.OK.CODE, transactions);
  } catch (err) {
    console.log('err', err);
    sendResponse(res, RES_STAT.INTL_SERVER_ERR.CODE, RES_STAT.INTL_SERVER_ERR.MSG);
  }
});

/* POST charge */
router.post('/', async (req, res) => {
  try {
    const { stripeToken, eventId } = req.body;
    console.log('charge jwt', req.headers.bearer);
    const decodedJWT = verifyJwt(req.headers.bearer);

    // get userId
    const [{ id }] = await db('user')
      .where({ email: decodedJWT.email })
      .select('id');
    const userId = id;
    console.log('userId', userId);

    // get price
    const [{ price }] = await db('event')
      .select('price')
      .where('id', eventId);
    console.log('price', price);

    // charge the user's card
    const args = { price, stripeToken, userId, eventId };
    handleCharge(args, (result) => {
      sendResponse(res, RES_STAT.OK.CODE, result);
    });
  } catch (err) {
    console.log('err', err);
    sendResponse(res, RES_STAT.INTL_SERVER_ERR.CODE, RES_STAT.INTL_SERVER_ERR.MSG);
  }
});

module.exports = router;
