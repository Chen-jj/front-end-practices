var babel = require("babel-core");

var result = babel.transformFileSync("es6_learn.js", []);
//console.log(result.code); //翻译后代码
//console.log(result.map);  //映射
//console.log(result.ast);  //抽象语法树
var fn = new Function(result.code);

fn();