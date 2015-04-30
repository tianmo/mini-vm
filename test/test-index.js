var fs = require('fs');
var e = require('expect.js');
var vm = require('../index');

var code = fs.readFileSync(__dirname + '/base-code.js', 'utf8');

var script = vm.createScript(code, 'test-base.vm');

describe('base', function(){
  it('runInNewContext', function(){
    script.runInNewContext();
  });
});

describe('sandbox', function(){
  it('runInNewContext', function(done){
    var sandbox = {
      console : {
        log: function(str){
          e(str).to.be('hello world!');
          done();
        }
      }
    };
    script.runInNewContext(sandbox);
  });
});

describe('node', function(){
  it('exports', function(){
    var nodeCode = fs.readFileSync(__dirname + '/node-code.js', 'utf8');
    var nodeScript = vm.createScript(nodeCode, 'test-node.vm');
    var myRequire = function(file){
      return require(file);
    };
    var sandbox = {
      exports: {},
      require: myRequire,
      module: {
        exports : {}
      },
      __filename: '.',
      __dirname: '.'
    };
    var result = nodeScript.runInNewContext(sandbox);
    var fn = sandbox.module.exports('arg');
    e(fn.getArgs()).to.be('arg');
  });
  it('require', function(){
    var nodeCode = fs.readFileSync(__dirname + '/node-code.js', 'utf8');
    var nodeScript = vm.createScript(nodeCode, 'test-node.vm');
    var myRequire = function(file){
      e(file).to.be('fs');
      return require(file);
    };
    var sandbox = {
      exports: {},
      require: myRequire,
      module: {
        exports : {}
      },
      __filename: '.',
      __dirname: __dirname
    };
    var result = nodeScript.runInNewContext(sandbox);
    var fn = sandbox.module.exports('arg');
    var text = fn.getFile();
    e(text).to.be(' hello world! ');
  });
});
