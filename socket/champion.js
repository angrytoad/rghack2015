var champions = {};
var Champion = function(id, name, health, damage, targetType, cooldown, description, ability) {
  this.id = id;
  this.name = name;
  this.health = health;
  this.damage = damage;
  this.targetType = targetType;
  this.ability = ability;
  this.cooldown = cooldown;
  this.description = description;
}

champions['Bard'] = new Champion(432, 'Bard', 16, 2, 'none', 2, 
  'Each allied champion has 70% chance to become invulnerable for the next turn. Each enemy champion has 30% chance to become invulnerable until their next turn.'
  , function(a, e, t, s) {
  // Ether freeze your cards or enemy's. Roll dice, based on what number you get resembles how many characters in the map you will freeze. 
  for (var i in a) {
    if (Math.random() < 0.7) {
      a[i].invulnerable();
      require('./game').addEvent(2, a[i], function(o) {
        o.makeVulnerable();
      });
    }
  }
  for (var i in e) {
    if (Math.random() < 0.3) {
      e[i].invulnerable();
      require('./game').addEvent(3, e[i], function(o) {
        o.makeVulnerable();
      });
    }
  }
});
champions['Brand'] = new Champion(63, 'Brand', 10, 9, 'single', 4, 
  'Pyroclasm: eals 8 damage to the targeted enemy champion and one other random enemy champion if there is any.'
  , function(a, e, t, s) {
  // Choose a target, this spell hits the target and a random card
  var keys = Object.keys(e);
  var other = null;
  if (keys.length >= 2) {
    var otherid = Math.floor(Math.random() * (keys.length - 1));
    other = keys[otherid];
    if (other == t) {
      other = keys[otherid + 1];
    }
  }
  for (var i in e) {
    if (e[i].id == t || e[i].id == other) {
      e[i].dealDamage(8);
    }
  }
});
champions['Chogath'] = new Champion(31, 'Chogath', 32, 3, 'single', 4,
  'Noms: Deals 8 damage to the targeted enemy champion. Gains 5 health and max health if Cho`Gath kills the target.'
  , function(a, e, t, s) {
  // If chogath kills an enemy, he permenantly gains health
  for (var i in e) {
    if (e[i].id == t) {
      e[i].dealDamage(8);
      if (e[i].health <= 0) {
        s.maxHealth += 5;
        s.health += 5;
      }
    }
  }
});
champions['Caitlyn'] = new Champion(51, 'Caitlyn', 8, 7, 'none', 4,
  'Ace in the Tole: Deals 20 damage to the enemy champion with the highest current health.'
  , function(a, e, t, s) {
  // Single target high damage to highest hp
  var keys = Object.keys(e);
  if (keys.length == 0) {
    return ;
  }
  var max = -1;
  var maxkey;
  for (var i in keys) {
    if (e[keys[i]].health > max) {
      max = e[keys[i]].health;
      maxkey = keys[i];
    }
  }
  e[maxkey].dealDamage(20);
});
champions['Darius'] = new Champion(122, 'Darius', 24, 4, 'single', 4, 
  'Dunk! Deals 8 damage to the targeted enemy champion. Can cast again next turn if Darius kills the target.'
  , function(a, e, t, s) {
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
champions['Karthus'] = new Champion(30, 'Karthus', 8, 6, 'none', 6,
  'Requiem: Deals 6 damage to each enemy champion.'
  , function(a, e, t, s) {
  for (var i in e) {
    e[i].dealDamage(6);
  }
});
champions['Kindred'] = new Champion(203, 'Kindred', 14, 5, 'passive', 0,
  'Passive: Gains 2 attack damage for every kill.'
  , function(a, e, t, s) {
  // Gain 2 attack damage every kill
  // implemented
});
champions['MasterYi'] = new Champion(11, 'MasterYi', 10, 9, 'none', 0,
  'Passive: Whenever Master Yi attacks, there is 50% chance to attack twice.'
  , function(a, e, t, s) {
  // Roll a dice when you attack this turn, you have a 50% chance to attack that champion again.
  // implemented
});
champions['Maokai'] = new Champion(57, 'Maokai', 30, 2, 'none', 0,
  'Passive: Allied champions take 3 less damage from all sources.'
  , function(a, e, t, s) {
  // Damage reduction for the team (3 turns)
});
champions['Morgana'] = new Champion(25, 'Morgana', 16, 4, 'none', 6,
  'Soul Shackles: Deals 4 damage to each enemy champion immediately and stun and deal 4 additional damage before your next turn.'
  , function(a, e, t, s) {
  // roll a dice, stun and damage the number rolled in random champions
  for (var i in e) {
    e[i].dealDamage(4);
    o.stun();
    require('./game').addEvent(2, e[i], function(o) {
      o.dealDamage(4);
      o.destun();
    });
  }
});
champions['Rengar'] = new Champion(107, 'Rengar', 15, 7, 'none', 4,
  'On the Hunt: Rengar gains 9 additional damage for your basic attack next turn.'
  , function(a, e, t, s) {
  // Rengar goes 'On the hunt' for one turn, then on the next turn does bonus damage
  s.damage += 9;
  require('./game').addEvent(3, s, function(o) {
    o.damage -= 7;
  });
});
champions['Sona'] = new Champion(37, 'Sona', 10, 6, 'none', 6,
  'Crescendo: For each enemy champion, 50% chance to deal 8 damage and stun for one turn.'
  , function(a, e, t, s) {
  // Roll between 0-5, stun that many champions this turn (random)
  for (var i in e) {
    if (Math.random() < 0.5) {
      e[i].dealDamage(8);
      e[i].stun();
      require('./game').addEvent(2, e[i], function(o) {
        o.destun();
      });
    }
  }
});
champions['Soraka'] = new Champion(16, 'Soraka', 14, 1, 'none', 4,
  'Wish: Heals all ally champions 3 health.'
  , function(a, e, t, s) {
  for (var i in a) {
    a[i].modifyHealth(3);
  }
});
champions['Teemo'] = new Champion(17, 'Teemo', 14, 5, 'passive', 0, 
  'Passive: 50% to deal 4 shroom damage to the enemy champion that does basic attack whenever Teemo is in play.'
  , function(a, e, t, s) {
  // When any enemy attacks, they roll, if they roll 4 or more they take damage
  // implemented
});
champions['Riven'] = new Champion(92, 'Riven', 22, 5, 'none', 4,
  'Riven gains 8 attack damage for your next two turns. Deals 4 damage to all enemy champions at your third turn.'
  , function(a, e, t, s) {
  // Use ult to increase basic attacks for the next 2 turns, on your third turn you can aoe for a small amount of damage
  o.damage += 8;
  require('./game').addEvent(5, s, function(o) {
    o.damage -= 8;
  });
  require('./game').addEvent(6, e, function(o) {
    for (var i in o) {
      o[i].dealDamage(4);
    }
  });
});
champions['Zilean'] = new Champion(26, 'Zilean', 12, 4, 'passive', 0,
  'Passive: Allied champions has 50% to revive with full health after being dealt lethal damage whenever Zilean is in play.'
  , function(a, e, t, s) {
  // Can cast on ally champion if they die this turn they are brought back to life with full hp
});

module.exports = champions;
