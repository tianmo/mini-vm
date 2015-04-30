var Fn = function(opt) {
};

var i = 1;

Fn.prototype.get = function() {
  return i;
};

Fn.prototype.add = function() {
  return i++;
};

module.exports = function(options) {
  return new Fn(options);
};
