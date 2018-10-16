const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 020     */
/***********************/
n! means n × (n − 1) × ... × 3 × 2 × 1
For example, 10! = 10 × 9 × ... × 3 × 2 × 1 = 3628800,
and the sum of the digits in the number 10! is 3 + 6 + 2 + 8 + 8 + 0 + 0 = 27.
Find the sum of the digits in the number 100!
`;

function job(target) {

	return Utils.factorial(target, false).toString().split('').reduce((acc, cur) => {
		return acc + parseInt(cur, 10);
	}, 0);

}

module.exports = {
	d: description,
	p: 100,
	f: job
}