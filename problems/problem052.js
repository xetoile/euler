const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 052     */
/***********************/
It can be seen that the number, 125874, and its double, 251748, contain exactly the same digits, but in a different order.
Find the smallest positive integer, x, such that 2x, 3x, 4x, 5x, and 6x, contain the same digits.
`;

function job(maxMultiplier) {

	const test = function (i) {
		for (let m = 2; m <= maxMultiplier; m++) {
			if (!Utils.isPermutation(i, i * m)) {
				return false;
			}
		}
		return true;
	};

	let integer = 1;
	while (!test(integer)) {
		integer++;
	}

	return integer;

}

module.exports = {
	d: description,
	p: 6,
	f: job
}