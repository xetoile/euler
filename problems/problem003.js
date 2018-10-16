const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 003     */
/***********************/
The prime factors of 13195 are 5, 7, 13 and 29.
What is the largest prime factor of the number 600851475143 ?
`;

function job(referenceNumber) {
	const factors = Utils.primeFactors(referenceNumber, true);
	return factors[factors.length - 1];
}


module.exports = {
	d: description,
	p: 600851475143,
	f: job
}

// 330 = 2 * 3 * 5 * 11