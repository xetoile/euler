const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 046     */
/***********************/
It was proposed by Christian Goldbach that every odd composite number can be written as the sum of a prime and twice a square.
9 = 7 + 2×1^2
15 = 7 + 2×2^2
21 = 3 + 2×3^2
25 = 7 + 2×3^2
27 = 19 + 2×2^2
33 = 31 + 2×1^2
It turns out that the conjecture was false.
What is the smallest odd composite that cannot be written as the sum of a prime and twice a square?
`;

function job(file) {

	const checkConjecture = function (n) {
		const primes = Utils.primesToLimit(n);
		for (const p of primes) {
			let sqrt = 1,
				sum;
			while ((sum = p + 2 * sqrt * sqrt) < n) {
				sqrt++;
			}
			if (sum === n) {
				return true;
			}
		}
		return false;
	};

	let i = 9;
	while (Utils.isPrime(i) || checkConjecture(i)) {
		i += 2;
	}

	return i;

}

module.exports = {
	d: description,
	p: null,
	f: job
}