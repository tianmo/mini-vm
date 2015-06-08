var runInThisContext;
var nodeVersion = process.versions.node;
var versionSeg = nodeVersion.split('.');

var getRunContext_10 = function(){
  var Script = process.binding('evals').NodeScript;
  return Script.runInThisContext;
};

var getRunContext_11 = function(){
  var binding = process.binding('contextify');
  var ContextifyScript = binding.ContextifyScript;

  return function(code, options) {
    var script = new ContextifyScript(code, options);
    return script.runInThisContext();
  };
};

if(versionSeg[1]/1 <= 10){
  runInThisContext = getRunContext_10();
}else{
  runInThisContext = getRunContext_11();
}

module.exports = runInThisContext;
