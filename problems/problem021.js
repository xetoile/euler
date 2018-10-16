const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 021     */
/***********************/
Let d(n) be defined as the sum of proper divisors of n (numbers less than n which divide evenly into n).
If d(a) = b and d(b) = a, where a ≠ b, then a and b are an amicable pair and each of a and b are called amicable numbers.
For example, the proper divisors of 220 are 1, 2, 4, 5, 10, 11, 20, 22, 44, 55 and 110; therefore d(220) = 284. The proper divisors of 284 are 1, 2, 4, 71 and 142; so d(284) = 220.
Evaluate the sum of all the amicable numbers under 10000.
`;

function job(target) {

	const getAmicablePair = function (n) {

		const getDivisorsSum = function (n) {
			return Utils.properDivisors(n).reduce((acc, cur) => {
				return acc + cur;
			});
		}

		const sum = getDivisorsSum(n);
		if (sum !== n && getDivisorsSum(sum) === n) {
			return sum;
		}
		return null;
	};

	const numbers = [];
	for (let i = 2; i < target; i++) {
		if (numbers.includes(i)) {
			continue;
		}
		const pair = getAmicablePair(i);
		if (pair) {
			numbers.push(i);
			numbers.push(pair);
		}
	}

	return numbers.reduce((acc, cur) => {
		return acc + cur;
	});

}

module.exports = {
	d: description,
	p: 10000,
	f: job
}