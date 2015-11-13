var champions = {};
var Champion = function(id, health, damage, targetType, cooldown, ability) {
  this.id = id;
  this.health = health;
  this.damage = damage;
  this.targetType = targetType;
  this.ability = ability;
  this.cooldown = cooldown;
}


champions['Bard'] = new Champion('Bard', 16, 2, 'none', 2, function(a, e, t) {
  // Ether freeze your cards or enemy's. Roll dice, based on what number you get resembles how many characters in the map you will freeze. 
});
champions['Brand'] = new Champion('Brand', 10, 9, 'single', 4, function(a, e, t) {
  // Choose a target, this spell hits the target and a random card
});
champions['ChoGath'] = new Champion('Chogath', 32, 3, 'single', 3, function(a, e, t) {
  // If chogath kills an enemy, he permenantly gains health
});
champions['Caitlyn'] = new Champion('Caitlyn', 8, 7, 'none', 4, function(a, e, t) {
  // Single target high damage to highest hp
});
champions['Darius'] = new Champion('Darius', 24, 4, 'single', 3, function(a, e, t) {
  // Damage an enemy, if you kill that enemy you can use your ult again next turn
});
champions['Karthus'] = new Champion('Karthus', 15, 2, 'none', 3, function(a, e, t) {
  for (var i in e) {
    e[i].dealDamage(3);
  }
});
champions['Kindred'] = new Champion('Kindred', 15, 2, 'none', 3, function(a, e, t) {
  // does nothing
});
champions['Master Yi'] = new Champion('MasterYi', 15, 2, 'none', 3, function(a, e, t) {
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
