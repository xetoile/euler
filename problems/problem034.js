const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 034     */
/***********************/
145 is a curious number, as 1! + 4! + 5! = 1 + 24 + 120 = 145.
Find the sum of all numbers which are equal to the sum of the factorial of their digits.
Note: as 1! = 1 and 2! = 2 are not sums they are not included.
`;

function job() {

	// define high bound
	let amount = 0;
	while (Utils.factorial(9) * ++amount >= parseInt(Array(amount).fill('9').join(''), 10));
	const limit = Utils.factorial(9) * amount;

	let sum = 0;
	mainLoop: for (let i = limit; i >= 10; i--) {
		const digits = Utils.toDigits(i);
		let added = 0;
		for (const d of digits) {
			added += Utils.factorial(d);
			if (added > i) {
				continue mainLoop;
			}
		}
		if (i === added) {
			sum += i;
		}
	}
	return sum;

}

module.exports = {
	d: description,
	p: null,
	f: job
}