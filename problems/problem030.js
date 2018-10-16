const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 030     */
/***********************/
Surprisingly there are only three numbers that can be written as the sum of fourth powers of their digits:
    1634 = 1^4 + 6^4 + 3^4 + 4^4
    8208 = 8^4 + 2^4 + 0^4 + 8^4
    9474 = 9^4 + 4^4 + 7^4 + 4^4
As 1 = 1^4 is not a sum it is not included.
The sum of these numbers is 1634 + 8208 + 9474 = 19316.
Find the sum of all the numbers that can be written as the sum of fifth powers of their digits.
`;

function job(power) {

	// cache all 10 digits' powers, our alphabet
	const cache = [];
	for (let i = 0; i < 10; i++) {
		cache.push(i ** power);
	}

	// define upper bound, when #terms of maximum powers can't reach anymore 10^#terms
	let digits = 2;
	while (cache[9] * digits >= 10 ** digits) {
		digits++;
	}
	const max = 10 ** digits;

	// run from minimal sum (2 digits) to upper bound
	let total = 0;
	for (let i = 10; i <= max; i++) {
		const sum = `${i}`.split('').reduce((acc, cur) => {
			return acc + cache[parseInt(cur, 10)];
		}, 0);
		if (sum === i) {
			total += sum;
		}
	}

	return total;

}


module.exports = {
	d: description,
	p: 5,
	f: job
}