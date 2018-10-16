const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 041     */
/***********************/
We shall say that an n-digit number is pandigital if it makes use of all the digits 1 to n exactly once. For example, 2143 is a 4-digit pandigital and is also prime.
What is the largest n-digit pandigital prime that exists?
`;

function job(targets) {

	for (let root = 9; root > 1; root--) {

		let current = "";
		for (let i = root; i > 0; i--) {
			current += i;
		}

		do {
			if (Utils.isPrime(parseInt(current, 10))) {
				return current;
			}
		} while (current = Utils.permute(current, true));
	}

}

module.exports = {
	d: description,
	p: null,
	f: job
}