const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 014     */
/***********************/
The following iterative sequence is defined for the set of positive integers:
n → n/2 (n is even)
n → 3n + 1 (n is odd)
Using the rule above and starting with 13, we generate the following sequence:
13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1
It can be seen that this sequence (starting at 13 and finishing at 1) contains 10 terms. Although it has not been proved yet (Collatz Problem), it is thought that all starting numbers finish at 1.
Which starting number, under one million, produces the longest chain?
NOTE: Once the chain starts the terms are allowed to go above one million.
`;

function job(max) {

	const result = {
		seed: 0,
		count: 0
	},
		cachedSteps = {};
	for (let i = max - 1; i > 1; i--) {
		let current = i,
			counter = 1;
		const steps = [current];
		do {
			if (cachedSteps[current]) {
				counter += cachedSteps[current] - 1;
				break;
			}
			if (current % 2) {
				current = 3 * current + 1;
			} else {
				current = current / 2;
			}
			steps.push(current);
			counter++;
		} while (current > 1);
		let ci = 0;
		while (ci < steps.length && !cachedSteps[steps[ci]]) {
			cachedSteps[steps[ci]] = counter - ci;
			ci++;
		}
		if (counter > result.count) {
			result.seed = i;
			result.count = counter;
		}
	}
	return result.seed;

}

module.exports = {
	d: description,
	p: 1000000,
	f: job
}

