var vm = require('vm');
var fs = require('fs');

var code = fs.readFileSync(__dirname + '/code.js', 'utf8');

var script = vm.createScript(code, 'hello.vm');

var myRequire = function(file){
  return require(file);
};

var sandbox = {
  require : myRequire,
  console : console,
  module : {
    exports : {}
  }
};
var result = script.runInNewContext(sandbox);
var fn = sandbox.module.exports('arg');

module.exports = function(){
  console.time('vm');
  for (var i = 0; i <= 10000000; i++) {
    fn.add();
  }
  console.timeEnd('vm');
}
