const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 048     */
/***********************/
The series, 1^1 + 2^2 + 3^3 + ... + 10^10 = 10405071317.
Find the last ten digits of the series, 1^1 + 2^2 + 3^3 + ... + 1000^1000.
`;

function job(limit, digits) {

	const BigNumber = Utils.BigNumber;
	let sum = new BigNumber(0);
	for (let i = 1; i <= limit; i++) {
		sum = sum.plus((new BigNumber(i)).pow(i));
	}

	return sum.toString().substr(-digits);

}

module.exports = {
	d: description,
	p: [1000, 10],
	f: job
}