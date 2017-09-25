const express = require('express');
const JsonWebToken = require('jsonwebtoken');
const knex = require('knex');
const querystring = require('querystring');

const knexConfig = require('../../knexfile');

const db = knex(knexConfig);

const router = express.Router();

const JWT_KEY = process.env.JWT_KEY || 'TEST_KEY';
const JWT_APP = process.env.JWT_APP || 'TEST_APP';
console.log('jwt key', JWT_KEY);
console.log('jwt app', JWT_APP);

function createJwt(profile) {
  return JsonWebToken.sign(profile, JWT_KEY, {
    expiresIn: '2d',
    issuer: JWT_APP,
  });
}

router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const socialToken = req.body.socialToken;
    const params = {
      access_token: socialToken,
      fields: 'name, email',
    };
    const query = querystring.stringify(params);

    const url = `https://graph.facebook.com/me?${query}`;
    const profile = await (await fetch(url)).json();
    console.log('profile', profile);
    const jwt = createJwt(profile);
    console.log('jwt', jwt);
    const user = await db('user')
      .where({ email: profile.email })
      .first();

    if (user) {
      console.log('EXISTING USER', user);
    } else {
      await db('user')
        .insert({
          name: profile.name,
          email: profile.email,
        });
      console.log('NEW USER', user);
    }

    res.json({
      jwt,
      name: profile.name,
      email: profile.email,
      id: profile.id,
    });
  } catch (err) {
    console.error('Error retrieving user info from FaceBook', err);
  }
});

module.exports = router;
