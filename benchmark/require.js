var RCode = require('./code');

var RFn = RCode('arg');

module.exports = function(){
  console.time('require');
  for (var i = 0; i <= 10000000; i++) {
    RFn.add();
  }
  console.timeEnd('require');
}


