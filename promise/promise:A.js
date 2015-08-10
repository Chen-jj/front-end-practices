/*
 * 参考《nodejs深入浅出》4.3.2
 **/

var EventEmitter = require('./node_modules/events.js');

//=============== Promise对象继承nodejs的EventEmitter ===============//
var Promise = function() {
	EventEmitter.call(this);
};

var ctor = function() {};
ctor.prototype = EventEmitter.prototype;
Promise.prototype = new ctor();
Promise.prototype.constructor = Promise;

Promise.prototype.then = function(successHandler, errorHandler, progressHandler) {
	typeof successHandler  === "function" && this.once('success', successHandler);
	typeof errorHandler    === "function" && this.once('error', errorHandler);
	typeof progressHandler === "function" && this.on('progress', progressHandler);

	return this;
};

//================= Deferred ===================//
var Deferred = function() {
	this.status = 'unfulfilled';
	this.promise = new Promise();
};

Deferred.prototype = {
	resolve: function(res) {
		this.status = "fulfilled";
		this.promise.emit("success", res);
	},
	reject: function(err) {
		this.status = "failed";
		this.promise.emit("error", err);
	},
	progress: function(data) {
		this.promise.emit("progress", data);
	}
};

Deferred.prototype.all = function(promises) {
	var that = this,
		result = [];
	this.count = promises.length;

	promises.foreach(function(promise, index) {
		promise.then(function(res) {
			this.count--;
			result[index] = res;
			if (!count) {
				that.resolve(result);
			}
		}, function(err) {
			that.reject(err);
		});
	});
	return that.promise;
};

//===================  test  ======================//
var q = new Deferred();
q.promise.then(function(res) {console.log(res);})

setTimeout(function(){
	q.resolve("haha");
}, 1500);

// var promise1 = readFile("foo.txt", "utf-8");
// var promise2 = readFile("bar.txt", "utf-8");
// var deferred = new Deferred();
// deferred.all([promise1, promise2]).then(function (results) {
// // TODO
// }, function (err) {
// // TODO 
// });

//=================== 回调深嵌套 ====================//

obj.api1(function (value1) { 
	obj.api2(value1, function (value2) {
		obj.api3(value2, function (value3) { 
			obj.api4(value3, function (value4) {
￼￼				callback(value4);
			});
		});
	});
});

//用普通函数将上述多重回调展开
var handler1 = function(value1) {
	obj.api2(value1, handler2);
};

var handler2 = function(value2) {
	obj.api3(value2, handler3);
};

var handler3 = function(value3) {
	obj.api4(value3, handler4);
};

var handler4 = function(value4) {
	callback(value4);
};

obj.api1(handler1);

//用EventProxy原理展开
var emitter = new EventEmitter();

emitter.on("api1_done", function(res) {
	obj.api2(res, function(value2) {
		emitter.emit("api2_done", value2);
	});
});

emitter.on("api2_done", function(res) {
	obj.api3(res, function(value3) {
		emitter.emit("api3_done", value3);
	});
});

emitter.on("api3_done", function(res) {
	obj.api4(res, function(value4) {
		callback(value4);
	});
});

obj.api1(function(value1) {
	emitter.emit("api1_done", value1);
});

//运用Promise实现链式调用,重写了上面的Promise和Deferred对象
var fs = require('fs');

var Promise = function() {
	this.queue = [];
	this.isPromise = true;
};

Promise.prototype.then = function(successHandler, errorHandler, progressHandler) {
	var handler = {};
	(typeof successHandler  === "function") && (handler['success']  = successHandler);
	(typeof errorHandler    === "function") && (handler['error']    = errorHandler);
	(typeof progressHandler === "function") && (handler['progress'] = progressHandler);

	this.queue.push(handler);
	return this;
};

var Deferred = function() {
	this.promise = new Promise();
};

Deferred.prototype.resolve = function(res) {
	var handler,
		ret,
		promise = this.promise;

	while (handler = promise.queue.shift()) {
		if (handler && handler.success) {
			ret = handler.success(res);
			if (ret && ret.isPromise) {
				ret.queue = promise.queue;
				//promise = ret;    //这里应该不用把前一个deferred对象的promise对象换成第二个返回的promise对象
				return;
			}
		}
	}
};

Deferred.prototype.reject = function() {
	var handler,
		promise = this.promise;

	while (handler = promise.queue.shift()) {
		if (handler && handler.error) {
			ret = handler.error(res);
			if (ret && ret.isPromise) {
				ret.queue = promise.queue;
				//promise = ret;
				return;
			}
		}
	}
};

Deferred.prototype.callback = function() {
	var that = this;
	return function(err, file) {
		if (err)
			return that.reject(err);
		that.resolve(file);
	};
};

//test
var readFile1 = function(file, encoding) {
	var q = new Deferred();
	fs.readFile(file, encoding, q.callback());
	return q.promise;
};

var readFile2 = function(file, encoding) {
	var q = new Deferred();
	fs.readFile(file, encoding, q.callback());
	return q.promise;
};

readFile1("file1.txt", "utf8").then(function(file1) {
	return readFile2(file1.trim(), "utf8");
}).then(function (file2) {
	console.log(file2);
});


//补充：为每个方法Promise化不科学，利用smooth工厂函数批量处理

function smooth(method) {
	return function() {
		var q = new Deferred();
		var args = Array.prototype.slice.call(arguments, 0);
		args.push(q.callback());

		method.apply(null, args);
		return q.promise;
	}
}

var readFile = smooth(fs.readFile);

readFile("file1.txt", "utf-8").then(function(file1) {
	return readFile(file1, "utf-8");
}).then(function (file2) {
	console.log(file2);
});