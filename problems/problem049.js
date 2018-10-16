const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 049     */
/***********************/
The arithmetic sequence, 1487, 4817, 8147, in which each of the terms increases by 3330, is unusual in two ways: (i) each of the three terms are prime, and, (ii) each of the 4-digit numbers are permutations of one another.
There are no arithmetic sequences made up of three 1-, 2-, or 3-digit primes, exhibiting this property, but there is one other 4-digit increasing sequence.
What 12-digit number do you form by concatenating the three terms in this sequence?
`;

function job(digits, exclude) {

	const primes = Utils.primesToLimit(10 ** digits - 1);
	const index = primes.findIndex((p) => {
		return p >= 10 ** (digits - 1);
	});
	primes.splice(0, index);

	for (let i = 0; i < primes.length; i++) {
		for (let j = i + 1; j < primes.length; j++) {
			if (
				exclude !== primes[i] &&
				Utils.isPermutation(primes[i], primes[j])
				&& primes.includes(2 * primes[j] - primes[i])
				&& Utils.isPermutation(primes[i], 2 * primes[j] - primes[i])
			) {
				return `${primes[i]}${primes[j]}${2 * primes[j] - primes[i]}`;
			}
		}
	}


}

module.exports = {
	d: description,
	p: [4, 1487],
	f: job
}