const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 035     */
/***********************/
The number, 197, is called a circular prime because all rotations of the digits: 197, 971, and 719, are themselves prime.
There are thirteen such primes below 100: 2, 3, 5, 7, 11, 13, 17, 31, 37, 71, 73, 79, and 97.
How many circular primes are there below one million?
`;

function job(target) {

	const check = function (n) {
		const digits = Utils.toDigits(n);
		for (let i = 0; i < digits.length - 1; i++) {
			digits.push(digits.shift());
			if (!Utils.isPrime(parseInt(digits.join(''), 10))) {
				return false;
			}
		}
		return true;
	};

	let count = 0;
	for (let i = 2; i < target; i++) {
		if (Utils.isPrime(i) && check(i)) {
			count++;
		}
	}

	return count;

}

module.exports = {
	d: description,
	p: 1000000,
	f: job
}