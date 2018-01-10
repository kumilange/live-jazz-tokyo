const { JWT_KEY, JWT_APP, RES_STAT } = require('../config/const');
const knexConfig = require('../../knexfile');
const { sendResponse } = require('../utils/');

const express = require('express');
const JsonWebToken = require('jsonwebtoken');
const querystring = require('querystring');
const db = require('knex')(knexConfig);

const router = express.Router();

const createQueryParam = (socialToken) => {
  const params = {
    access_token: socialToken,
    fields: 'name, email',
  };
  return querystring.stringify(params);
};

const createJwt = (profile) => {
  return JsonWebToken.sign(profile, JWT_KEY, {
    expiresIn: '2d',
    issuer: JWT_APP,
  });
};

const formatResponse = (jwt, user) => {
  return {
    jwt,
    userProfile: {
      name: user.name,
      email: user.email,
      id: user.id,
    },
  };
};

/* POST auth */
router.post('/', async (req, res) => {
  try {
    const query = createQueryParam(req.body.socialToken);
    const url = `https://graph.facebook.com/me?${query}`;
    const profile = await (await fetch(url)).json();
    console.log('profile', profile);
    // error handling for fb graph
    if (profile.error) {
      sendResponse(res, RES_STAT.BAD_REQ.CODE, profile.error);
      return;
    }

    // get user
    const { name, email } = profile;
    let [user] = await db('user')
      .where({ email })
      .select();
    console.log('user', user);

    if (!user) {
      [user] = await db('user')
        .insert({ name, email })
        .returning('*');
      console.log('new user', user);
    }

    // create jwt
    const jwt = createJwt(profile);
    console.log('jwt', jwt);

    sendResponse(res, RES_STAT.OK.CODE, formatResponse(jwt, user));
  } catch (err) {
    console.log('err', err);
    sendResponse(res, RES_STAT.INTL_SERVER_ERR.CODE, RES_STAT.INTL_SERVER_ERR.MSG);
  }
});

module.exports = router;
