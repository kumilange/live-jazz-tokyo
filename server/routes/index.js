const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/events', (req, res) => {
console.log("query", req.query)
  res.status(200).json({"id":1,"event":"ヴォーカル・セッション","artist":"ジョー蒲池","venue":"杜のうた","lat":35.66400358859232,"lng":139.7168344729012,"price":5000,"start":1507105800000,"end":1507116600000});
});

module.exports = router;