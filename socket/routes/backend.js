var express = require('express');
var router = express.Router();
var game = require('../game');

router.get('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  next();
})

router.post('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  next();
})

router.post('/init', function(req, res, next) {
  console.log(req.body);
  var deck0 = JSON.parse(req.body.deck0);
  var deck1 = JSON.parse(req.body.deck1);
  game.initGame(deck0, deck1);
  res.send('game initialized');
});

router.get('/clear', function(req, res, next) {
  game = null;
});

module.exports = router;
