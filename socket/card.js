var champion = require('./champion');

var Card = function(player, id, champname) {
  console.log(champname);
  this.id = 'card' + player + 'c' + id;
  var champ = champion[champname];
  this.champion = champname;
  this.championid = champ.id;
  this.player = player;
  this.container = 'hand';
  this.health = champ.health;
  this.maxHealth = champ.health;
  this.damage = champ.damage;
  this.targetType = champ.targetType;
  this.ability = champ.ability;
  this.currentCooldown = champ.cooldown;
  this.abilityCooldown = champ.cooldown;
  this.description = champ.description;
  this.stunned = 0;
  this.lastAction = -1;
  this.isInvulnerable = 0;
  this.dead = false;
}

Card.prototype.dealDamage = function(amount) {
  var game = require('./game');
  if (this.isInvulnerable) {
    return ;
  }
  if (game.hasChampion(this.player, 'Maokai')) {
    amount -= 3;
    if (amount < 0) {
      amount = 0;
    }
  }
  this.health -= amount;
  if (game.hasChampion(this.player, 'Zilean') && this.health <= 0 && Math.random() < 0.5) {
    this.health = this.maxHealth;
  }
}

Card.prototype.modifyHealth = function(amount) {
  this.health += amount;
  if (this.health > this.maxHealth) {
    this.health = this.maxHealth;
  }
}

Card.prototype.stun = function() {
  this.stunned++;
}

Card.prototype.destun = function() {
  this.stunned--;
}

Card.prototype.invulnerable = function() {
  this.isInvulnerable++;
}

Card.prototype.makeVulnerable = function() {
  this.isInvulnerable--;
}

module.exports = Card;
