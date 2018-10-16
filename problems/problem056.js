const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 056     */
/***********************/
A googol (10^100) is a massive number: one followed by one-hundred zeros; 100^100 is almost unimaginably large: one followed by two-hundred zeros. Despite their size, the sum of the digits in each number is only 1.
Considering natural numbers of the form, a^b, where a, b < 100, what is the maximum digital sum?
`;

function job(limit) {

	let record = 0;
	for (let a = limit - 1; a > 0; a--) {
		for (let b = limit - 1; b > 0; b--) {
			const sum = (new Utils.BigNumber(a)).pow(b).toString().replace(/0/g, '').split('').reduce((acc, cur) => {
				return acc + parseInt(cur, 10);
			}, 0);
			if (sum > record) {
				record = sum;
			}
		}
	}
	return record;

}

module.exports = {
	d: description,
	p: 100,
	f: job
}