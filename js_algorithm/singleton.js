/*
 *    * * * * * * * *  *          * * * * * * * * *        * * * * * * * * *
 *    *    Singleton   *          *               *        *      toy1     *
 *    * * * * * * * *  *          *  constructor  *        * * * * * * * * *
 *    *                *     |--->*               * <- - - *- _prototype_  *
 *    *   getInstance  *     |    *    getName    *        * name = "toys" *
 *    *                *     |    *               *        * instance=null *
 *    *    prototype - * - - -    * * * * * * * * *        *               *
 *    *                *                               |-> * * * * * * * * *
 *    *    instance  - * - - - - - - - - - - - - - - - -  
 *    *                *
 *    * * * * * * * *  *   
 *    
 *    把判断是否已存在实例的钩子insatnce挂在函数对象Singleton上 
 **/
var Singleton = function(name) {
	this.name = name;
	this.instance = null;
};

Singleton.prototype.getName = function() {
	console.log(this.name);
};

Singleton.getInstance = function(name) {
	if (!this.instance) {
		this.instance = new Singleton(name);
	}
	return this.instance;
}

var toy1 = Singleton.getInstance('toy1');
var toy2 = Singleton.getInstance('toy2');

console.log(toy1);
console.log(toy2);
console.log(toy1 === toy2);


//=======================================================//

/*
 * 把判断是否已存在实例的钩子insatnce挂在匿名函数闭包属性 instance 上 
 **/
/*var Singleton = function(name) {
	this.name = name;
}

Singleton.prototype.getName = function() {
	console.log(this.name);
}

Singleton.getInstance = (function() {
	var instance = null;

	return function(name) {
		if (!instance)
			instance = new Singleton(name);
		
		return instance;
	}
})()


var toy1 = Singleton.getInstance('toy1');
var toy2 = Singleton.getInstance('toy2');
console.log(toy1);
console.log(toy2);
console.log(toy1 === toy2);*/

//=======================================================//
/*
 * 和第二例差不多，代理函数替换掉单利类构造函数的getInstance属性
 * 把判断是否已存在实例的钩子insatnce挂在匿名函数闭包属性 instance 上 
 **/
var createDiv = function(html) {
	this.html = html;
	this.init();
}

createDiv.prototype.init = function() {
	var div = document.createElement("div");
	div.innerHTML = this.html;
	document.body.appendChild(div);
}

var ProxySingletonCreateDiv = (function() {
	var instance = null;

	return function(html) {
		if (!instance)
			instance = new createDiv(html);
		 return instance;
	}

})();

var div1 = ProxySingletonCreateDiv("div1");
var div2 = ProxySingletonCreateDiv("div2");

console.log(div1);
console.log(div2);
console.log(div1 === div2);

//=======================================================//
/*
 * 惰性加载
 * 点击按钮时才生成弹窗，而且只生成一次。
 **/
var createDiv = (function() {
	var div = null;

	return function() {
		if (!div) {
			var div = document.createElement("div");
			div.innerHTML = "this is a div";
			div.style.display = "none";
			document.body.appendChild(div);
		}
		return div;
	};
})();

document.getElementById("btn").onclick = function() {
	var div = createDiv();
	div.style.display = "block";
};

//=======================================================//

var createDiv = function() {
	console.log(this + "");
	var div = document.createElement("div");
	div.innerHTML = "this is a div";
	div.style.display = "none";
	document.body.appendChild(div);
	return div;
};

var getSingle = function(fn) {
	var singleton = null;

	return function() {
		if (!singleton) {
        	//singleton = fn.apply(this,arguments);
			singleton = fn();
		}
		return singleton;
	}
}

var createSingleDiv = getSingle(createDiv);

var div1 = createSingleDiv();
var div2 = createSingleDiv();

console.log(div1);
console.log(div2);
console.log(div1 === div2);










