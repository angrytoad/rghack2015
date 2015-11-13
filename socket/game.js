var Card = require('./card');

var game = {
  
  // constants
  deckSize: 15,
  nexusHealth: 20,

  players: null,
  turn: 0,
  sockets: [null, null],
  turnEvents: {},
  pingTimer: null,
  nexus: null,

  initGame: function(deck, name, id) {
    if (this.players == null || this.players[1] != null) {
      this.players = [];
      this.turnEvents = {};
      this.players[0] = {
        'field' : {},
        'hand': {},
        'deck': deck,
        'name': name,
        'id': id
      };
      this.sockets = [null, null];
      if (this.pingTimer == null) {
        this.pingTimer = setInterval(this.ping, 5000);
      }
      this.nexus = [this.nexusHealth, this.nexusHealth];
      return '0';
    }
    this.players[1] = {
      'field' : {},
      'hand': {},
      'deck': deck,
      'name': name,
      'id': id
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
    this.sendData(0, 'opponent', {name: this.players[1].name, id: this.players[1].id});
    this.sendData(1, 'opponent', {name: this.players[0].name, id: this.players[0].id});
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
    var len = this.players[player].deck.length;
    if (len == 0) {
      return ;
    }
    var champion = this.players[player].deck.pop();
    console.log('Player ' + player + ' drawn ' + champion);
    var cardinstance = new Card(player, len, champion);
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
    this.sendData(0, 'nexus', this.nexus);
    this.sendData(1, 'enemy', this.players[0].field);
    this.sendData(1, 'player', this.players[1].field);
    this.sendData(1, 'hand', this.players[1].hand);
    this.sendData(1, 'nexus', this.nexus);
  },

  placeCard: function(player, hand) {
    console.log('placing card');
    this.players[player].field[hand] = this.players[player].hand[hand];
    delete this.players[player].hand[hand];
    this.players[player].field[hand].container = 'field';
    this.sendState();
  },

  attack: function(player, card, target) {
    if (this.players[player].field[card].lastAction == this.turn) {
      return ;
    }
    var enemy = 1 - player;
    var damage = this.players[player].field[card].damage;
    this.players[player].field[card].lastAction = this.turn;
    var targetobj = this.players[enemy].field[target];
    if (this.hasChampion(enemy, 'Teemo')) {
      if (Math.random() < 0.5) {
        this.players[player].field[card].dealDamage(4);
      }
    }
    targetobj.dealDamage(damage);
    if (card.champion == "MasterYi") {
      targetobj.dealDamage(damage);
    }
    this.checkDeath();
    if (card.champion == "Kindred" && targetobj.dead) {
      card.damage += 2;
    }
    this.sendState();
  },

  ability: function(player, card, target) {
    if (this.players[player].field[card].lastAction == this.turn) {
      return ;
    }
    var enemy = 1 - player;
    var a = this.players[player].field;
    var e = this.players[enemy].field;
    console.log(a);
    console.log(e);
    console.log(this.players[player].field[card].ability);
    this.players[player].field[card].lastAction = this.turn;
    this.players[player].field[card].currentCooldown = this.players[player].field[card].abilityCooldown;
    this.players[player].field[card].ability(a, e, target);
    this.checkDeath();
    this.sendState();
  },

  checkDeath: function() {
    for (var j = 0; j < 2; j++) {
      var keys = Object.keys(this.players[j].field);
      for (var i in keys) {
        if (this.players[j].field[keys[i]].health <= 0) {
          this.players[j].field[keys[i]].dead = true;
          this.sendData(0, 'death', this.players[j].field[keys[i]].championid);
          this.sendData(1, 'death', this.players[j].field[keys[i]].championid);
          delete this.players[j].field[keys[i]];
        }
      }
    }
  },

  sendData: function(player, type, data) {
    this.sockets[player].write('data: ' + JSON.stringify({type: type, data: data}) + '\n\n');
  },

  nextTurn: function() {
    var x = Object.keys(this.players[0].field).length;
    var y = Object.keys(this.players[1].field).length;
    if (x < y) {
      this.nexus[0] -= y - x;
    } else {
      this.nexus[1] -= x - y;
    }
    this.turn++;
    this.runEvents();
    this.reduceCooldowns();
    this.sendData(0, 'turn', this.turn);
    this.sendData(1, 'turn', this.turn);
    this.drawCard(this.turn % 2);
    this.sendState();
    if (this.nexus[0] <= 0 || this.nexus[1] <= 0) {
      this.sendData(0, this.nexus[0] <= 0 ? 'defeat' : 'victory', this.turn);
      this.sendData(1, this.nexus[1] <= 0 ? 'defeat' : 'victory', this.turn);
    }
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
  },

  addEvent: function(delay, obj, cb) {
    if (this.turnEvents['turn' + (this.turn + delay)] == undefined) {
      this.turnEvents['turn' + (this.turn + delay)] = [];
    }
    this.turnEvents['turn' + (this.turn + delay)].push({obj: obj, cb: cb});
  },

  runEvents: function() {
    var events = this.turnEvents[this.turn];
    for (var i in events) {
      if (events[i].obj.dead) {
        continue;
      }
      events[i].cb(events[i].obj);
    }
    delete this.turnEvents[this.turn];
  },

  hasChampion: function(player, champion) {
    for (var i in this.players[player].field) {
      if (this.players[player].field[i].champion == champion) {
        return true;
      }
    }
    return false;
  },

  ping: function() {
    if (this.sockets && this.sockets[0]) {
      this.sockets[0].write('\n');
    }
    if (this.sockets && this.sockets[1]) {
      this.sockets[1].write('\n');
    }
  },

  reduceCooldowns: function() {
    for (var i in this.players[0].field) {
      if (this.players[0].field[i].currentCooldown > 0) {
        this.players[0].field[i].currentCooldown--;
      }
    }
    for (var i in this.players[1].field) {
      if (this.players[1].field[i].currentCooldown > 0) {
        this.players[1].field[i].currentCooldown--;
      }
    }
  }
}

module.exports = game;
