const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 047     */
/***********************/
The first two consecutive numbers to have two distinct prime factors are:
14 = 2 × 7
15 = 3 × 5
The first three consecutive numbers to have three distinct prime factors are:
644 = 2² × 7 × 23
645 = 3 × 5 × 43
646 = 2 × 17 × 19.
Find the first four consecutive integers to have four distinct prime factors each. What is the first of these numbers?
`;

function job(distinctFactors) {

	const test = function (tested, limit) {
		for (let i = 0; i < limit; i++) {
			if (Utils.primeFactors(tested + i, true).length !== limit) {
				return false;
			}
		}
		return true;
	};

	let i = Utils.primesToPosition(distinctFactors).reduce((acc, cur) => {
		return acc * cur;
	});

	while (!test(i++, distinctFactors));

	return i - 1;

}

module.exports = {
	d: description,
	p: 4,
	f: job
}