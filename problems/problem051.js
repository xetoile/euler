const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 051     */
/***********************/
By replacing the 1st digit of the 2-digit number *3, it turns out that six of the nine possible values: 13, 23, 43, 53, 73, and 83, are all prime.
By replacing the 3rd and 4th digits of 56**3 with the same digit, this 5-digit number is the first example having seven primes among the ten generated numbers, yielding the family: 56003, 56113, 56333, 56443, 56663, 56773, and 56993. Consequently 56003, being the first member of this family, is the smallest prime with this property.
Find the smallest prime which, by replacing part of the number (not necessarily adjacent digits) with the same digit, is part of an eight prime value family.
`;

function job(familySize) {

	const lookupFamily = function (prime, size) {
		prime = `${prime}`;
		// TODO: in case size >= 7, we could return if length < 5 (given by problem)
		const length = prime.length,
			wildcard = 'x',
			// TODO: in case size > 4 (1,3,7,9), we could also avoid testing last digit as wildcard
			allowedFailures = 10 - size,
			digitDirectory = Utils.digitsDirectory(prime),
			record = [],
			wildcardRegex = new RegExp(`${wildcard}`, 'g');
		for (const digit of Object.keys(digitDirectory)) {
			const wildprime = prime.replace(new RegExp(`${digit}`, 'g'), wildcard),
				family = [];
			let failures = 0;
			for (let replacement = 0; replacement <= 9; replacement++) {
				const perm = wildprime.replace(wildcardRegex, `${replacement}`),
					iPerm = parseInt(perm, 10);
				if (`${iPerm}`.length !== length) {
					failures++;
					continue;
				}
				if (Utils.isPrime(iPerm)) {
					family.push(iPerm);
				} else {
					failures++;
				}
				if (failures > allowedFailures) {
					// TODO: this condition is too late in case we failed on length
					break;
				}
			}
			if (family.length >= size) {
				return family;
			}
		};
		return [];
	};

	let position = 1;
	let family = [];
	while (!(family = lookupFamily(Utils.primesToPosition(position).pop(), familySize)).length) {
		position++;
	}
	return Utils.primesToPosition(position).pop();

}

module.exports = {
	d: description,
	p: 8,
	f: job
}