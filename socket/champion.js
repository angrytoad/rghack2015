var champions = {};
var Champion = function(id, health, damage, ability) {
  this.id = id;
  this.health = health;
  this.damage = damage;
  this.ability = ability;
}

champions['karthus'] = new Champion('karthus', 15, 2, function(a, e, t) {
  for (var i in e) {
    e[i].dealDamage(3);
  }
});


champions['soraka'] = new Champion('soraka', 14, 1, function(a, e, t) {
  for (var i in a) {
    a[i].modifyHealth(2);
  }
});

module.exports = champions;
