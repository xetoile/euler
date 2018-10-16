const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 036     */
/***********************/
The decimal number, 585 = 1001001001(2) (binary), is palindromic in both bases.
Find the sum of all numbers, less than one million, which are palindromic in base 10 and base 2.
(Please note that the palindromic number, in either base, may not include leading zeros.)
`;

function job(target) {

	let sum = 0;
	for (let i = 0; i < target; i++) {
		if (Utils.isPalindrome(i) && Utils.isPalindrome(i.toString(2))) {
			sum += i;
		}
	}
	return sum;

}

module.exports = {
	d: description,
	p: 1000000,
	f: job
}