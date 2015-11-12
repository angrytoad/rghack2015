var champion = require('./champion');

var Card = function(id, champname) {
  console.log(champname);
  this.id = id;
  var champ = champion[champname];
  this.health = champ.health;
  this.damage = champ.damage;
  this.ability = champ.ability;
  this.stunned = 0;
}

Card.prototype.dealDamage = function(amount) {
  this.health -= amount;
}

module.exports = Card;
