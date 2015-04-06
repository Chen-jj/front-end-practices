function f(num) {
	var str = new String(num);
	var arr = str.split("");

	var len = arr.length - 1;
	for (var i = len, j = 1; i >= 0; i--, j++) {
		if (j % 3 == 0 && i != 0) {
			arr.splice(i, 0, ",");
		}
	}
	var res = arr.join("");
	return res;
}