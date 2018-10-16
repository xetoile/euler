const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 063     */
/***********************/
The 5-digit number, 16807=7^5, is also a fifth power. Similarly, the 9-digit number, 134217728=8^9, is a ninth power.
How many n-digit positive integers exist which are also an nth power?
`;

function job() {
	// x^y: x=10 is the first to always show y+1 digits
	// 		=> x < 10
	// use of BigNumber advised: 9 ** 22 is approximated in native JS
	// there shouldn't be duplicates

	let count = 0;
	for (let b = 1; b < 10; b++) {
		let e = 1;
		const base = new Utils.BigNumber(b);
		while (base.pow(e).toString().length === e) {
			e++;
		}
		count += e - 1;
	}
	return count;

}

module.exports = {
	d: description,
	p: null,
	f: job
}