const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 004     */
/***********************/
A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.
Find the largest palindrome made from the product of two 3-digit numbers.
`;

function job(digits) {

	const max = Math.pow(10, digits) - 1,
		min = Math.pow(10, digits - 1),
		mirror = function (str) {
			return str.split('').reverse().join('');
		};

	let current = max;
	while (current >= min) {
		const sCurrent = `${current}`,
			pal = parseInt(sCurrent + mirror(sCurrent), 10);
		let divisor = max;
		while (divisor >= min) {
			if (pal % divisor === 0 && pal / divisor <= max) {
				return pal;
			}
			divisor--;
		}
		current--;
	}
	return -1;
	
}


module.exports = {
	d: description,
	p: 3,
	f: job
}