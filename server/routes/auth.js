const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  res.json('hey');
  console.log('hey')
});

module.exports = router;
