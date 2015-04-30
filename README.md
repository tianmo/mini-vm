mini-vm
========

node原生的vm模块实现了完全的资源隔离，但是性能不是很理想，而在某些应用场景下，我们需要的是简单的沙盒。

mini-vm是为了满足这类场景而设计的，结合了require和vm模块，实现简化的沙盒模块。

mini-vm模块的api兼容node原生方法，可以无缝的切换到原生vm模块。

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

## 性能

```
node benchmark/index.js
```

* vm: 7823ms
* mini-vm: 53ms
* require: 44ms
