const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 005     */
/***********************/
2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.
What is the smallest positive number that is evenly divisible (divisible with no remainder) by all of the numbers from 1 to 20?
`;

function job(max) {

	const underMin = Math.floor(max / 2);
	let n = max,
		divisible = false;
	while (!divisible) {
		divisible = true;
		for (let j = max; j > underMin; j--) {
			if (n % j !== 0) {
				divisible = false;
				n += max;
				break;
			}
		}
	}
	return n;
}


module.exports = {
	d: description,
	p: 20,
	f: job
}