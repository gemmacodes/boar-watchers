var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("hi! This is Express")
  res.send({ message : "hi! This is Express"})
});

module.exports = router;
