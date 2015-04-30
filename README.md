mini-vm
========

结合require和vm模块，实现简化的vm模块

## demo

调用方式和vm的Script模块类似，仅实现了runInNewContext功能

```javascript
var vm    = require('mini-vm');

var code = 'console.log("hello word")';

var script = vm.createScript(code, 'hello.vm');

var sandbox = {
  console : {
    log: function(str){
      console.log('....' + str);
    }
  }
};
script.runInNewContext(sandbox);
```

## api

### vm.createScript(code, options)

options:

* filename: allows you to control the filename that shows up in any stack traces produced from this script.

### new vm.Script(code, options)

### script.runInNewContext(sandbox)

## 功能

由于实现方式和require类似，因此vm代码还是能够访问原生属性和方法，如果需要禁用或者mock原生功能，可以在sandbox中传入
