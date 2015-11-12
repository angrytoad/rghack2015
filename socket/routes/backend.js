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
  var deck = JSON.parse(req.body.deck);
  res.send(game.initGame(deck));
});

router.get('/clear', function(req, res, next) {
  game = null;
});

module.exports = router;
