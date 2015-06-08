var runInThisContext = require('./context');

var createWrapper = function(sandbox){
  var wrapper = [
    '(function (',
    [],
    ') { ',
    '\n});'
  ];
  var values = [];
  if(!sandbox){
    return [
      [wrapper[0] + wrapper[2], wrapper[3]],
      values
    ];
  }else{
    for(var key in sandbox){
      wrapper[1].push(key);
      values.push(sandbox[key]);
    }
    return [
      [wrapper[0] + wrapper[1].join(', ') + wrapper[2], wrapper[3]],
      values
    ];
  }
}

var wrap = function(wrapper, script) {
  return wrapper[0] + script + wrapper[1];
};

function Script(code, options) {
  this.code = code;
  this.options = options;
}

Script.prototype.runInNewContext = function(sandbox){
  var wrapper = createWrapper(sandbox);
  var code = wrap(wrapper[0], this.code);
  var fn = runInThisContext(code, this.options);
  fn.apply(null, wrapper[1]);
}

module.exports = {
  createScript: function(code, options){
    return new Script(code, options);
  },
  Script : Script
};
