const express = require('express');
const JsonWebToken = require('jsonwebtoken');

const router = express.Router();

// TODO: Parameterize
const KEY = 'jazz was meant to be live!';
const APP = 'livejazz';

function createJwt(profile) {
  return JsonWebToken.sign(profile, KEY, {
    expiresIn: '2d',
    issuer: APP,
  });
}

router.post('/', async (req, res) => {
  try {
    const socialToken = req.body.socialToken;

    const url = `https://graph.facebook.com/me?access_token=${socialToken}`;
    const profile = await (await fetch(url)).json();
    console.log('profile', profile);
    const jwt = createJwt(profile);
    console.log('jwt', jwt);
    res.json({
      jwt,
      name: profile.name,
      id: profile.id,
    });
  } catch (err) {
    console.error('Error retrieving user info from FaceBook', err);
  }
});

module.exports = router;
