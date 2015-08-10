/*
 * learn from https://blog.oyanglul.us/javascript/functional-javascript.html
 * require Babel to transform
 **/

var a = [1, 2, 3, 4, 5, 6];

//=====================================================//

var b = a.map(x => x * 2);
console.log(b);

//=====================================================//
/*
 * 使用匿名函数可不用再缓存this，注意this.inc要放末尾才有此效果
 **/
var Multipler = function(inc) {
	this.inc = inc;
};

Multipler.prototype.multiple = function(numbers) {
	return numbers.map(number => number * this.inc);
};

/*Multipler.prototype.multiple = function(numbers) {
	var self = this;
	return numbers.map(function(number) {return self.inc * number;});
};*/

var c = new Multipler(2).multiple(a);
console.log(c);

//=====================================================//
/*
 * 起别名函数
 **/
var E = () => {}
var aliasFor = oldName => {
    var fn = newName => {
      E[newName] = E[oldName];
      return fn;
    };
    return (fn.is = fn.are = fn.and = fn);
};

E.reduce = 'i am reduce';
aliasFor('reduce').is('reduceLeft').and('foldl');

console.log(E.reduce, E.reduceLeft, E.foldl)

//=====================================================//













