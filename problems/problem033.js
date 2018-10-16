const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 033     */
/***********************/
The fraction 49/98 is a curious fraction, as an inexperienced mathematician in attempting to simplify it may incorrectly believe that 49/98 = 4/8, which is correct, is obtained by cancelling the 9s.
We shall consider fractions like, 30/50 = 3/5, to be trivial examples.
There are exactly four non-trivial examples of this type of fraction, less than one in value, and containing two digits in the numerator and denominator.
If the product of these four fractions is given in its lowest common terms, find the value of the denominator.
`;

function job() {

	const getDigit = function (number, index) {
		return parseInt(`${number}`.split('')[index]);
	}
	const perms = [[0,0], [0,1], [1,0], [1,1]];
	let np = 1,
		dp = 1;

	for (let n = 10; n < 100; n++) {
		if (n % 10 === 0) {
			continue;
		}
		for (let d = n + 1; d < 100; d++) {
			if (d % 10 === 0) {
				continue;
			}
			for (const perm of perms) {
				const nd = getDigit(n, perm[0]),
					dd = getDigit(d, perm[1]);
				if (dd / nd === d / n && getDigit(n, (perm[0] + 1) % 2) === getDigit(d, (perm[1] + 1) % 2)) {
					// console.log(`${n}/${d}=${getDigit(n, perm[0])}/${getDigit(d, perm[1])}`);
					np *= nd;
					dp *= dd;
					break;
				}
			}
		}
	}
	const nf = Utils.primeFactors(np),
		df = Utils.primeFactors(dp);
	for (let i = 0; i < nf.length; i++) {
		if (df.includes(nf[i])) {
			df.splice(df.indexOf(nf[i]), 1);
		}
	}
	return df.reduce((acc, cur) => {
		return acc * cur;
	});

}

module.exports = {
	d: description,
	p: null,
	f: job
}