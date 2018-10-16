const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 006     */
/***********************/
The sum of the squares of the first ten natural numbers is,
12 + 22 + ... + 102 = 385
The square of the sum of the first ten natural numbers is,
(1 + 2 + ... + 10)2 = 552 = 3025
Hence the difference between the sum of the squares of the first ten natural numbers and the square of the sum is 3025 − 385 = 2640.
Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.
`;

function job(max) {

	let squaresSum = 0,
		sum = 0;
	for (let i = 1; i <= max; i++) {
		sum += i;
		squaresSum += i * i;
	}
	return sum * sum - squaresSum;

}


module.exports = {
	d: description,
	p: 100,
	f: job
}