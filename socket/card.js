var champion = require('./champion');

var Card = function(player, id, champname) {
  console.log(champname);
  this.id = 'card' + player + 'c' + id;
  var champ = champion[champname];
  this.player = player;
  this.container = 'hand';
  this.health = champ.health;
  this.maxHealth = champ.health;
  this.damage = champ.damage;
  this.targetType = champ.targetType;
  this.ability = champ.ability;
  this.stunned = 0;
}

Card.prototype.dealDamage = function(amount) {
  this.health -= amount;
}

Card.prototype.modifyHealth = function(amount) {
  this.health += amount;
  if (this.health > this.maxHealth) {
    this.health = this.maxHealth;
  }
}

module.exports = Card;
