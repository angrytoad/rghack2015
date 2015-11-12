var game = {
  
  teams: null,
  turn: 0,
  sockets: [null, null],

  initGame: function(deck0, deck1) {
    this.teams = [];
    this.teams[0] = {
      'slot0' : null,
      'slot1' : null,
      'slot2' : null,
      'slot3' : null,
      'slot4' : null,
      'hand': [],
      'deck': deck0,
    };
    this.teams[1] = {
      'slot0' : null,
      'slot1' : null,
      'slot2' : null,
      'slot3' : null,
      'slot4' : null,
      'hand': [],
      'deck': deck1,
    };
    this.turn = 0;
    console.log('game initialized');
    console.log('this.teams');
  },

  startGame: function() {
    console.log('starting game');
    this.sendHealth();
    this.endGame();
  },

  endGame: function() {
    this.sockets[0].end();
    this.sockets[1].end();
  },

  sendHealth: function() {
    var healths = [{}, {}];
    for (var i = 0; i < 5; i++) {
      healths[0]['slot' + i] = this.teams[0]['slot' + i] ? this.teams[0]['slot' + i].health : null;
      healths[1]['slot' + i] = this.teams[1]['slot' + i] ? this.teams[1]['slot' + i].health : null;
    }
    
    var healthstr = JSON.stringify(healths);
    for (var i = 0; i < 2; i++) {
      this.sockets[i].write('data: ' +  healthstr + '\n\n');
    }
  },

  action: function(player, action) {
    switch (action.type) {
      case 'place':
        return this.placeCard(player, action.hand, action.slot);
      case 'attack' : 
        return this.attack(player, action.slot, action.target);
    }
    return false;
  }
}

module.exports = game;
