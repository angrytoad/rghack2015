var express = require('express');
var router = express.Router();

var abc = 0;
/* GET home page. */
router.get('/time', function(req, res, next) {
  res.json({
  	name : 'Tony',
  	time : (new Date()).getTime()
  });
});

router.get('/add', function(req, res, next) {
  res.json({
  	count : ++abc,
  });
});

module.exports = router;
