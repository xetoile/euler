const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 016     */
/***********************/
2^15 = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26.
What is the sum of the digits of the number 2^1000?
`;

function job(exp) {

	const BigNumber = Utils.BigNumber.clone({EXPONENTIAL_AT: [-7, exp]});

	return data = new BigNumber(2).pow(exp).toString().split('').reduce((accumulator, current) => {
		return accumulator + parseInt(current);
	}, 0);

}

module.exports = {
	d: description,
	p: 1000,
	f: job
}