const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 009     */
/***********************/
A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,
a^2 + b^2 = c^2
For example, 3^2 + 4^2 = 9 + 16 = 25 = 52.
There exists exactly one Pythagorean triplet for which a + b + c = 1000.
Find the product abc.
`;

function job(target) {

	return Utils.pythagoreanTriplets(target)[0].reduce((acc, cur) => {
		return acc * cur;
	});
}

module.exports = {
	d: description,
	p: 1000,
	f: job
}