const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 037     */
/***********************/
The number 3797 has an interesting property. Being prime itself, it is possible to continuously remove digits from left to right, and remain prime at each stage: 3797, 797, 97, and 7. Similarly we can work from right to left: 3797, 379, 37, and 3.
Find the sum of the only eleven primes that are both truncatable from left to right and right to left.
NOTE: 2, 3, 5, and 7 are not considered to be truncatable primes.
`;

function job(amount) {

	const isTruncatablePrime = function (n) {
		let isPrime = Utils.isPrime(n);
		if (isPrime) {
			const digits = Utils.toDigits(n),
				ltr = digits.map(x => x),
				rtl = digits.map(x => x);
			do {
				ltr.shift();
				rtl.pop();
			} while (
				ltr.length && rtl.length
				&& (isPrime = Utils.isPrime(parseInt(ltr.join(''), 10)) && Utils.isPrime(parseInt(rtl.join(''), 10)))
			);
		}
		return isPrime;
	};

	const primes = [];
	for (let i = 10; primes.length < amount; i++) {
		if (isTruncatablePrime(i)) {
			primes.push(i);
		}
	}

	return primes.reduce((acc, cur) => {
		return acc + cur;
	});


}

module.exports = {
	d: description,
	p: 11,
	f: job
}