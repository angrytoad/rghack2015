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
  var name = JSON.parse(req.body.name);
  var id = JSON.parse(req.body.id);
  res.send(game.initGame(deck, name, id));
});

router.get('/clear', function(req, res, next) {
  game = null;
});

module.exports = router;
