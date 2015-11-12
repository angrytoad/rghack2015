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

router.get('/game', function(req, res, next) {
  var player = parseInt(req.query.player);
  game.sockets[player] = res;
  res.writeHead(200, {
    'Connection': 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache'
  });
  if (game.sockets[0] && game.sockets[1]) {
    game.startGame();
  }
});

router.post('/action', function(req, res, next) {
  var player = parseInt(req.body.player);
  if (game.turn % 2 != player % 2) {
    return res.send('Not your turn');
  }
  console.log('Player ' + player + ' action: ' + req.body.action)
  game.action(player, JSON.parse(req.body.action));
  res.send('OK');
});

module.exports = router;
