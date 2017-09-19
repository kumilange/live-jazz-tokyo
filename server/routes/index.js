const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.status(200).json({"test": "200"})
});

module.exports = router;