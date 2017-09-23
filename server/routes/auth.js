const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/', async (req, res) => {
  const network = req.body.network;
  const socialToken = req.body.socialToken;

  const url = `https://graph.facebook.com/me?access_token=${socialToken}`;
  const profile = await (await fetch(url)).json();
  console.log('profile', profile);
  const jwt = createJwt(profile);
  console.log('jwt', jwt);
  res.json({
    jwt,
    name: profile.name,
    id: profile.id
  });
});

function createJwt(profile) {
	return jwt.sign(profile, 'MY_PRIVATE_KEY', {
		expiresIn: '2d',
		issuer: 'MY_APP'
	});
}

function verifyJwt(jwtString) {
	return jwt.verify(jwtString, 'MY_PRIVATE_KEY', {
		issuer: 'MY_APP'
	});
}



module.exports = router;
