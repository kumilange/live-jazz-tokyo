const { JWT_KEY, JWT_APP } = require('../config/const');
const knexConfig = require('../../knexfile');

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

const saveNewUser = async (profile) => {
  let user = await db('user')
    .where({ email: profile.email })
    .first();

  if (user) {
    console.log('EXISTING USER', user);
  } else {
    [user] = await db('user')
      .returning('*')
      .insert({
        name: profile.name,
        email: profile.email,
      });
    console.log('NEW USER', user);
  }
  return user;
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

router.post('/', async (req, res) => {
  try {
    const query = createQueryParam(req.body.socialToken);
    const url = `https://graph.facebook.com/me?${query}`;
    const profile = await (await fetch(url)).json();
    console.log('profile', profile);
    const user = await saveNewUser(profile);
    const jwt = createJwt(profile);
    console.log('jwt', jwt);
    res.json(formatResponse(jwt, user));
  } catch (err) {
    console.error('Error retrieving user info from FaceBook', err);
  }
});

module.exports = router;
