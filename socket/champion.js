var champions = {};
var Champion = function(id, health, damage, targetType, cooldown, ability) {
  this.id = id;
  this.health = health;
  this.damage = damage;
  this.targetType = targetType;
  this.ability = ability;
  this.cooldown = cooldown;
}


champions['Bard'] = new Champion('Bard', 15, 2, 'none', 3, function(a, e, t) {
  // does nothing
});
champions['Brand'] = new Champion('Brand', 15, 2, 'none', 3, function(a, e, t) {
  // does nothing
});
champions['ChoGath'] = new Champion('ChoGath', 15, 2, 'none', 3, function(a, e, t) {
  // does nothing
});
champions['Caitlyn'] = new Champion('Caitlyn', 15, 2, 'none', 3, function(a, e, t) {
  // does nothing
});
champions['Darius'] = new Champion('Darius', 15, 2, 'none', 3, function(a, e, t) {
  // does nothing
});
champions['Karthus'] = new Champion('Karthus', 15, 2, 'none', 3, function(a, e, t) {
  for (var i in e) {
    e[i].dealDamage(3);
  }
});
champions['Kindred'] = new Champion('Kindred', 15, 2, 'none', 3, function(a, e, t) {
  // does nothing
});
champions['Master Yi'] = new Champion('Master Yi', 15, 2, 'none', 3, function(a, e, t) {
  // does nothing
});
champions['Maokai'] = new Champion('Maokai', 15, 2, 'none', 3, function(a, e, t) {
  // does nothing
});
champions['Morgana'] = new Champion('Morgana', 15, 2, 'none', 3, function(a, e, t) {
  // does nothing
});
champions['Rengar'] = new Champion('Rengar', 15, 2, 'none', 3, function(a, e, t) {
  // does nothing
});
champions['Sona'] = new Champion('Sona', 15, 2, 'none', 3, function(a, e, t) {
  // does nothing
});
champions['Soraka'] = new Champion('Soraka', 14, 1, 'none', 3, function(a, e, t) {
  for (var i in a) {
    a[i].modifyHealth(2);
  }
});
champions['Teemo'] = new Champion('Teemo', 15, 2, 'none', 3, function(a, e, t) {
  // does nothing
});
champions['Riven'] = new Champion('Riven', 15, 2, 'none', 3, function(a, e, t) {
  // does nothing
});
champions['Zilean'] = new Champion('Zilean', 15, 2, 'none', 3, function(a, e, t) {
  // does nothing
});

module.exports = champions;
