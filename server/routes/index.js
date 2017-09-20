const express = require('express');

const stripe = require("stripe")("sk_test_BQokikJOvBiI2HlWgH4olfQ2");
const router = express.Router();

router.post('/charge', (req, res) => {
 
  console.log('body', req.body);
  const tokenID = req.body.stripeToken.id;
  const eventID = req.body.eventID;

  // Charge the user's card:
  stripe.charges.create({
    amount: 1000,
    currency: "jpy",
    description: "Example charge",
    source: tokenID,
  }, function(err, charge) {
    let response;
    if(err) {
      response = {
        OK: false
      }
    } else {
      response = {
        OK: true
      }
    }
    res.status(200).json(response);
  });

});

module.exports = router;
