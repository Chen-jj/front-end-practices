var promise = function() {
	this.handlers = [];
};

promise.prototype.then = function(successHandler, errorHandler, progressHandler) {
	this.handlers.push({
		success: successHandler || function(){},
		error: errorHandler || function(){},
		progress: progressHandler || function(){}
	});
	console.log(this.handlers)
	return this;
};

promise.prototype.resolve = function(result) {
	this.complete("success", result);
};

promise.prototype.reject = function(result) {
	this.complete("error", result);
};

promise.prototype.progress = function(result) {
	this.complete("progress", result);
};

promise.prototype.complete = function(type, result) {
	while(this.handlers[0])
		this.handlers.shift()[type](result);
};

var p = new promise();

p
.then(function(result) {
	console.log("1: " + result);
})
.then(function(result) {
	console.log("2: " + result);
})
.then(function(result) {
	console.log("3: " + result);
});

setTimeout(function(){p.resolve("hi")}, 3000);