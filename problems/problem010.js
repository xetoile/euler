const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 010     */
/***********************/
The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.
Find the sum of all the primes below two million.
`;

function job(target) {

	return Utils.primesToLimit(target - 1).reduce((acc, cur) => {
		return acc + cur;
	}, 0);

}

module.exports = {
	d: description,
	p: 2000000,
	f: job
}