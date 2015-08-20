function strLeft(s, n) {
	var i = 0, res = [], patten;

	s.replace(/./g, function(word) {
		patten = new RegExp("[^\x00-\xff]");

		if (patten.test(word) === false) {
			if (i + 1 <= n) {
				res.push(word);
				++i
			}
			else
				return
		} else {
			if (i + 2 <= n) {
				res.push(word);
				i +=2;
			}
			else
				return
		}

		return word;
	});
	return res.join("");
}
