function Object(b) {
	function ctor() {};
	ctor.prototype = b.prototype;
	retrun new ctor();
}

sub.prototype = Object(super);
sub.prototype.constructor = sub;

function extend(sub, super) {
	function ctor() {};
	for (var i in super)
		super.hasOwnProperty(i) && (sub[i] = super[i]);
	ctor.prototype = super.prototype;
	sub.prototype = new ctor();
	sub.prototype.constructor = sub;
}