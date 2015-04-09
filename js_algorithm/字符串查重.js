function duplicate(str) {
	return /(.).*\1/.test(str);
}