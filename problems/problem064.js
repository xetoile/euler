const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 064     */
/***********************/
All square roots are periodic when written as continued fractions and can be written in the form:
√N = a0 + 	
1 /
  	a1 + 1 /
  	  	a2 + 1 /
  	  	  	a3 + ...
For example, let us consider √23:
√23 = 4 + √23 — 4 = 4 + 1 / (1 / (√23—4)) = 4 + 1 / (1 + (√23 – 3) / 7)
If we continue we would get the following expansion:
√23 = 4 + 	
1 /
  	1 + 1 /
  	  	3 + 1 /
  	  	  	1 + 1 /
  	  	  	  	8 + ...
The process can be summarised as follows:
[SEE ORIGINAL]
It can be seen that the sequence is repeating. For conciseness, we use the notation √23 = [4;(1,3,1,8)], to indicate that the block (1,3,1,8) repeats indefinitely.
The first ten continued fraction representations of (irrational) square roots are:
√2=[1;(2)], period=1
√3=[1;(1,2)], period=2
√5=[2;(4)], period=1
√6=[2;(2,4)], period=2
√7=[2;(1,1,1,4)], period=4
√8=[2;(1,4)], period=2
√10=[3;(6)], period=1
√11=[3;(3,6)], period=2
√12= [3;(2,6)], period=2
√13=[3;(1,1,1,1,6)], period=5
Exactly four continued fractions, for N ≤ 13, have an odd period.
How many continued fractions for N ≤ 10000 have an odd period?
`;

function job(max) {
	/*
	shape: z * (sqrt - x) / y
	1. rearrange reciprocal 1 / z * (sqrt - x) / y => y / (z * (sqrt - x)) => y * (sqrt + x) / (sqrt ** 2 - x ** 2)
	2. reduce y / (sqrt ** 2 - x ** 2)
	3. floor (an)
	4. subtract floor * (sqrt ** 2 - x ** 2) - y * x
	5. next step z = y; x = 4.; y = (sqrt ** 2 - x ** 2)
	*/

	let out = 0;
	for (let n = 2; n <= max; n++) {
		const sqrt = Math.sqrt(n);
		if ((sqrt | 0) === sqrt) {
			continue;
		}
		const chain = [];
		const a0 = Math.floor(sqrt);
		let multiplier = [1, 1];
		let subtract = a0;
		let index;
		let r;
		do {
			// compute a rearranged reciprocal and next coefficient
			multiplier.reverse();
			multiplier[1] = (multiplier[1] ** 2 * n - subtract ** 2);
			multiplier = Utils.reduceFraction(multiplier);
			const floor = Math.floor(multiplier[0] * (sqrt + subtract) / multiplier[1]);
			subtract = floor * multiplier[1] - multiplier[0] * subtract; // inverted - as we want a + number
			// check the chain: stop looping on period, or feed the chain an go on
			r = {
				c: floor,
				n: multiplier[0],
				d: multiplier[1],
				s: subtract
			};
			index = chain.findIndex((c) => {
				return r.c === c.c && r.n === c.n && r.d === c.d && r.s === c.s;
			});
		} while (index === -1 && chain.push(r));
		// +1 if odd period
		out += chain.length % 2;
		// console.log(`sqrt(${n}): [${a0};(${chain.map(c => c.coefficient).join(',')})]`);
	}
	return out;

}

module.exports = {
	d: description,
	p: 10000,
	f: job
}