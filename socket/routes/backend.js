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
  var name = req.body.name;
  var id = parseInt(req.body.id);
  var icon = parseInt(req.body.iconId);
  var masteries = parseInt(req.body.masteries);
  res.send(game.initGame(deck, name, icon, id, masteries));
});

router.get('/clear', function(req, res, next) {
  game = null;
});

module.exports = router;
