const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 050     */
/***********************/
The prime 41, can be written as the sum of six consecutive primes:
41 = 2 + 3 + 5 + 7 + 11 + 13
This is the longest sum of consecutive primes that adds to a prime below one-hundred.
The longest sum of consecutive primes below one-thousand that adds to a prime, contains 21 terms, and is equal to 953.
Which prime, below one-million, can be written as the sum of the most consecutive primes?
`;

function job(max) {

	const primes = Utils.primesToLimit(max - 1);
	let percent = 0;

	const record = {
		size: 0,
		result: 0
	};
	for (let cursor = 0; cursor < primes.length - record.size; cursor++) {
		let result = 0,
			size = 0,
			subCursor = 0;
		do {
			if (size > record.size && Utils.isPrime(result)) {
				record.result = result;
				record.size = size;
			}
			result += primes[cursor + subCursor];
			size++;
			subCursor++;
		} while (result < max);
	}
	return record.result;

}

module.exports = {
	d: description,
	p: 1000000,
	f: job
}