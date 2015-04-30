var Fn = function(opt) {
  this.opt = opt;
};

var i = 1;

Fn.prototype.get = function() {
  return i;
};

Fn.prototype.getFile = function() {
  var fs = require('fs');
  var text = fs.readFileSync(__dirname + '/file', 'utf8');
  return text;
};

Fn.prototype.getArgs = function() {
  return this.opt;
};

Fn.prototype.add = function() {
  return i++;
};

module.exports = function(options) {
  return new Fn(options);
};