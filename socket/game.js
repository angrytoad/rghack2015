var Card = require('./card');

var game = {
  
  // constants
  deckSize: 10,

  players: null,
  turn: 0,
  sockets: [null, null],

  initGame: function(deck) {
    if (this.players == null) {
      this.players = [];
      this.players[0] = {
        'field' : {},
        'hand': {},
        'deck': deck,
      };
      return '0';
    }
    this.players[1] = {
      'field' : {},
      'hand': {},
      'deck': deck,
    };
    return '1';
  },

  startGame: function() {
    console.log('starting game');
    this.shuffleDecks();
    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 2; j++) {
        this.drawCard(j);
      }
    }
    console.log(this.players[0].deck);
    console.log(this.players[1].deck);
    this.sendState();
    this.turn = -1;
    this.nextTurn();
    //this.endGame();
  },

  shuffleDecks: function() {
    for (var k = 0; k < 2; k++) {
      for (var i = 0; i < this.deckSize; i++) {
        var j = Math.floor(Math.random() * i);
        var o = this.players[k].deck[j];
        this.players[k].deck[j] = this.players[k].deck[i];
        this.players[k].deck[i] = o;
      }
    }
  },

  drawCard: function(player) {
    var id = this.players[player].deck.length;
    var champion = this.players[player].deck.pop();
    console.log('Player ' + player + ' drawn ' + champion);
    var cardinstance = new Card(player, id, champion);
    this.players[player].hand[cardinstance.id] = cardinstance;
    var o = {
      type: "draw",
      card: cardinstance
    };
    this.sendData(player, 'draw', cardinstance);
  },

  endGame: function() {
    this.sockets[0].end();
    this.sockets[1].end();
  },

  sendState: function() {
    this.sendData(0, 'player', this.players[0].field);
    this.sendData(0, 'enemy', this.players[1].field);
    this.sendData(0, 'hand', this.players[0].hand);
    this.sendData(1, 'enemy', this.players[0].field);
    this.sendData(1, 'player', this.players[1].field);
    this.sendData(1, 'hand', this.players[1].hand);
  },

  placeCard: function(player, hand) {
    console.log('placing card');
    this.players[player].field[hand] = this.players[player].hand[hand];
    delete this.players[player].hand[hand];
    this.players[player].field[hand].container = 'field';
    this.sendState();
  },

  attack: function(player, card, target) {
    var enemy = 1 - player;
    var damage = this.players[player].field[card].damage;
    this.players[enemy].field[target].dealDamage(damage);
    this.checkDeath();
    this.sendState();
  },

  ability: function(player, card, target) {
    var enemy = 1 - player;
    var a = this.players[player].field;
    var e = this.players[enemy].field;
    console.log(a);
    console.log(e);
    console.log(this.players[player].field[card].ability);
    this.players[player].field[card].ability(a, e, target);
    this.checkDeath();
    this.sendState();
  },

  checkDeath: function() {
    for (var j = 0; j < 2; j++) {
      var keys = Object.keys(this.players[j].field);
      for (var i in keys) {
        if (this.players[j].field[keys[i]].health < 0) {
          delete this.players[j].field[keys[i]];
        }
      }
    }
  },

  sendData: function(player, type, data) {
    this.sockets[player].write('data: ' + JSON.stringify({type: type, data: data}) + '\n\n');
  },

  nextTurn: function() {
    this.turn++;
    this.sendData(0, 'turn', this.turn);
    this.sendData(1, 'turn', this.turn);
  },

  action: function(player, action) {
    console.log(action.hand);
    if (action.type == "place") {
      this.placeCard(player, action.hand);
    }
    if (action.type == "attack") {
      this.attack(player, action.card, action.target);
    }
    if (action.type == "ability") {
      this.ability(player, action.card, action.target);
    }
    if (action.type == "endturn") {
      this.nextTurn();
    }
  }
}

module.exports = game;
