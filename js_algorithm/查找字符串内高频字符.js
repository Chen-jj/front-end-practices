/*
 * only suit for English & digit
 **/

var str = "7a1b7bc7c17cb77b";
var max_len = 0, freq_char = '';

//sort
str = str.split("").sort().join("");


var reg = /(\w)\1+/g;

str.replace(reg, function($0, $1) {
	if ($0.length > max_len) {
		max_len   = $0.length;
		freq_char = $1;
	}
})

console.log('The most freqently char:' + freq_char);
console.log('appearance time:' + max_len);