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

const saveCharge = async (params) => {
  try {
    const { charge, userID, eventID } = params;
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
  } catch (error) {
    console.log('err', error);
    return { error };
  }
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
    if (err) {
      cb(null, err);
      return;
    }
    const result = await saveCharge({ charge, userID, eventID });
    const { error } = result;
    console.log('charge result', result);
    if (error) {
      cb(null, error);
      return;
    }
    cb(result, null);
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
    sendResponse(res, RES_STAT.OK.CODE, result);
  } catch (err) {
    console.log('err', err);
    sendResponse(res, RES_STAT.INTL_SERVER_ERR.CODE, RES_STAT.INTL_SERVER_ERR.MSG);
  }
});

router.post('/', async (req, res) => {
  try {
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

    // TODO handle errors properly 
    if (!(userID && price)) {
      throw new TypeError('Internal Server Error.');
    }

    // Charge the user's card:
    const args = { price, stripeToken, userID, eventID };
    handleCharge(args, (response, err) => {
      if (err && !err.OK) {
        // TODO handle error properly 
        throw new TypeError('Internal Server Error.');
      }
      sendResponse(res, RES_STAT.OK.CODE, response);
    });
  } catch (err) {
    console.log('err', err);
    sendResponse(res, RES_STAT.INTL_SERVER_ERR.CODE, RES_STAT.INTL_SERVER_ERR.MSG);
  }
});

module.exports = router;
