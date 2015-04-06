function isDuplicate() {
	var len = arguments.length;
	var obj = {};

	for (var i = 0; i < len; i++) {
		if (obj[arguments[i]] === undefined) {
			obj[arguments[i]] = 1;
		} else {
			return true;
		}
	}

	return false;
}