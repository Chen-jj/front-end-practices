function flatten(arr) {
	var res = [];
	var len = arr.length;
	var sublen, subArr;

	for (var i = 0; i < len; i++) {
		if (typeof(arr[i]) == "number") {
			res.push(arr[i])
		} else {
			subArr = flatten(arr[i]);
			sublen = subArr.length;
			for (var j = 0; j < sublen; j++) {
				res.push(subArr[j]);
			}
		}
	}

	return res;
}

console.log(flatten([1,[[2,3],33,45,45,[1,[2,3]]]]));