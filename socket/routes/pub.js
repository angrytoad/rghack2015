var express = require('express');
var router = express.Router();
var game = require('../game');

router.get('/game', function(req, res, next) {
  var player = parseInt(req.query.player);
  game.sockets[player] = res;
  /*res.writeHead(200, {
    'Connection': 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache'
  });*/
  if (game.sockets[0] && game.sockets[1]) {
    game.startGame();
  }
});

router.get('/action', function(req, res, next) {
  var player = parseInt(req.query.player);
  if (game.turn != player) {
    return res.send('Not your turn');
  }
  console.log('Player ' + player + ' action: ' . req.query.action)
  var success = game.action(player, JSON.parse(req.query.action));
  return res.send(success ? 'OK' : 'failed');
});

module.exports = router;
