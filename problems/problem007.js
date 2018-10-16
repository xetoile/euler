const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 007     */
/***********************/
By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.
What is the 10 001st prime number?
`;

function job(position) {

	return Utils.primesToPosition(position).pop();

}

module.exports = {
	d: description,
	p: 10001,
	f: job
}