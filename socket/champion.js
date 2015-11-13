var champions = {};
var Champion = function(id, health, damage, targetType, cooldown, ability) {
  this.id = id;
  this.health = health;
  this.damage = damage;
  this.targetType = targetType;
  this.ability = ability;
  this.cooldown = cooldown;
}

champions['Bard'] = new Champion('Bard', 16, 2, 'none', 2, function(a, e, t, s) {
  // Ether freeze your cards or enemy's. Roll dice, based on what number you get resembles how many characters in the map you will freeze. 
});
champions['Brand'] = new Champion('Brand', 10, 9, 'single', 4, function(a, e, t, s) {
  // Choose a target, this spell hits the target and a random card
});
champions['ChoGath'] = new Champion('Chogath', 32, 3, 'single', 3, function(a, e, t, s) {
  // If chogath kills an enemy, he permenantly gains health
  for (var i in e) {
    if (e[i].id == t) {
      e[i].dealDamage(8);
      if (e[i].hp < 0) {
        s.maxHealth += 5;
        s.health += 5;
      }
    }
  }
});
champions['Caitlyn'] = new Champion('Caitlyn', 8, 7, 'none', 4, function(a, e, t, s) {
  // Single target high damage to highest hp
  var keys = Object.keys(e);
  if (keys.length == 0) {
    return ;
  }
  var max = -1;
  var maxkey;
  for (var i in keys) {
    if (e[keys[i]].hp > max) {
      max = e[keys[i]].hp;
      maxkey = keys[i];
    }
  }
  e[maxkey].dealDamage(20);
});
champions['Darius'] = new Champion('Darius', 24, 4, 'single', 3, function(a, e, t, s) {
  // Damage an enemy, if you kill that enemy you can use your ult again next turn
  for (var i in e) {
    if (e[i].id == t) {
      e[i].dealDamage(8);
      if (e[i].hp < 0) {
        s.currentCooldown = 0;
      }
    }
  }
});
champions['Karthus'] = new Champion('Karthus', 15, 2, 'none', 3, function(a, e, t, s) {
  for (var i in e) {
    e[i].dealDamage(3);
  }
});
champions['Kindred'] = new Champion('Kindred', 15, 2, 'none', 3, function(a, e, t, s) {
  // All champions cannot go below 1 HP this turn (including enemies)
});
champions['Master Yi'] = new Champion('MasterYi', 15, 2, 'none', 3, function(a, e, t, s) {
  // Roll a dice when you attack this turn, you have a 50% chance to attack that champion again.
});
champions['Maokai'] = new Champion('Maokai', 15, 2, 'none', 3, function(a, e, t, s) {
  // Damage reduction for the team (3 turns)
});
champions['Morgana'] = new Champion('Morgana', 15, 2, 'none', 3, function(a, e, t, s) {
  // roll a dice, stun and damage the number rolled in random champions
});
champions['Rengar'] = new Champion('Rengar', 15, 2, 'none', 3, function(a, e, t, s) {
  // Rengar goes 'On the hunt' for one turn, then on the next turn does bonus damage
});
champions['Sona'] = new Champion('Sona', 15, 2, 'none', 3, function(a, e, t, s) {
  // Roll between 0-5, stun that many champions this turn (random)
});
champions['Soraka'] = new Champion('Soraka', 14, 1, 'none', 3, function(a, e, t, s) {
  for (var i in a) {
    a[i].modifyHealth(2);
  }
});
champions['Teemo'] = new Champion('Teemo', 15, 2, 'none', 3, function(a, e, t, s) {
  // When any enemy attacks, they roll, if they roll 4 or more they take damage
});
champions['Riven'] = new Champion('Riven', 15, 2, 'none', 3, function(a, e, t, s) {
  // Use ult to increase basic attacks for the next 2 turns, on your third turn you can aoe for a small amount of damage
});
champions['Zilean'] = new Champion('Zilean', 15, 2, 'none', 3, function(a, e, t, s) {
  // Can cast on ally champion if they die this turn they are brought back to life with full hp
});

module.exports = champions;
