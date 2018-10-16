const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 023     */
/***********************/
A perfect number is a number for which the sum of its proper divisors is exactly equal to the number. For example, the sum of the proper divisors of 28 would be 1 + 2 + 4 + 7 + 14 = 28, which means that 28 is a perfect number.
A number n is called deficient if the sum of its proper divisors is less than n and it is called abundant if this sum exceeds n.
As 12 is the smallest abundant number, 1 + 2 + 3 + 4 + 6 = 16, the smallest number that can be written as the sum of two abundant numbers is 24. By mathematical analysis, it can be shown that all integers greater than 28123 can be written as the sum of two abundant numbers. However, this upper limit cannot be reduced any further by analysis even though it is known that the greatest number that cannot be expressed as the sum of two abundant numbers is less than this limit.
Find the sum of all the positive integers which cannot be written as the sum of two abundant numbers.
`;
async function job() {

	// given by problem
	const max = 28123;

	// taken from 021
	const getDivisorsSum = function (n) {
		return Utils.properDivisors(n).reduce((acc, cur) => {
			return acc + cur;
		});
	}

	// sorted dictionary of abundant numbers
	const abundantNumbers = [];
	for (var i = 2; i <= max; i++) {
		if (getDivisorsSum(i) > i) {
			abundantNumbers.push(i);
		}
	}

	// build a sorted local cache of sums of abundant numbers
	let sums = new Set();
	for (let i = 0; i < abundantNumbers.length; i++) {
		for (let j = i; j < abundantNumbers.length; j++) {
			const sum = abundantNumbers[i] + abundantNumbers[j];
			if (sum <= max) {
				sums.add(sum);
			}
		}
	}
	sums = Array.from(sums);
	sums.sort(function (a, b) {
		return a - b;
	});

	// do the job: for each sum of abundant numbers: current sum's triangle minus previous sum's
	let lastSum = 0,
		total = 0;
	for (let i = 0; i < sums.length; i++) {
		const currentSum = sums[i];
		if (currentSum === lastSum) {
			continue;	// TODO: can we really have duplicates?
		}
		total += Utils.triangle(currentSum - 1) - Utils.triangle(lastSum);
		lastSum = currentSum;
	}

	return total;

}

module.exports = {
	d: description,
	p: null,
	f: job
}