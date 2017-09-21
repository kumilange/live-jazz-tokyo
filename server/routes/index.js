const express = require('express');

const stripe = require('stripe')('sk_test_BQokikJOvBiI2HlWgH4olfQ2');

const router = express.Router();

router.post('/charge', (req, res) => {
  const tokenID = req.body.stripeToken.id;

  // Charge the user's card:
  stripe.charges.create({
    amount: 1000,
    currency: 'jpy',
    description: 'Example charge',
    source: tokenID,
  }, (err, charge) => {
    let response;
    if (err) {
      response = {
        OK: false,
      };
    } else {
      response = {
        OK: true,
        message: charge,
      };
    }
    res.status(200).json(response);
  });
});

router.post('/addevent', (req, res) => {
  console.log('body', req.body);
  res.status(200).json({ message: 'YAY' });
})

module.exports = router;
