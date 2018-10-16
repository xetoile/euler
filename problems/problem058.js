const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 058     */
/***********************/
Starting with 1 and spiralling anticlockwise in the following way, a square spiral with side length 7 is formed.
37 36 35 34 33 32 31
38 17 16 15 14 13 30
39 18  5  4  3 12 29
40 19  6  1  2 11 28
41 20  7  8  9 10 27
42 21 22 23 24 25 26
43 44 45 46 47 48 49
It is interesting to note that the odd squares lie along the bottom right diagonal, but what is more interesting is that 8 out of the 13 numbers lying along both diagonals are prime; that is, a ratio of 8/13 ≈ 62%.
If one complete new layer is wrapped around the spiral above, a square spiral with side length 9 will be formed. If this process is continued, what is the side length of the square spiral for which the ratio of primes along both diagonals first falls below 10%?
`;

function job(ratio) {

	const primeRatio = function (size, primesAmount) {
		const diagonalNumbersAmount = (size - 1) * 2 + 1;
		return primesAmount / diagonalNumbersAmount;
	};

	let last = 1,
		step = 0,
		primesAmount = 0;
	do {
		step += 2;
		for (let spiral = 0; spiral < 3; spiral++) { // first 3 sides of the spiral may provide primes
			last += step;
			if (Utils.isPrime(last)) {
				primesAmount++;
			}
		}
		last += step; // 4th side of the spiral always provides squares of odd numbers, not interesting here
	} while (primeRatio(step + 1, primesAmount) >= ratio);

	return step + 1; // === side length

	// this works... given the time. Probably.
	// var primeRatio = function (spiral) {
	// 	var size = spiral.length;
	// 	var primeNumbers = 0;
	// 	for (var it = 0; it < size; it++) {
	// 		primeNumbers += Utils.isPrime(spiral[it][it]) + Utils.isPrime(spiral[it][size -1 - it]);
	// 	}
	// 	var centerIndex = size - 1;
	// 	primeNumbers -= Utils.isPrime(spiral[centerIndex][centerIndex]);
	// 	var diagonalNumbers = (size - 1) * 2 + 1;
	// 	console.log(`${size}: ${primeNumbers} / ${diagonalNumbers} = ${primeNumbers / diagonalNumbers}`);
	// 	return primeNumbers / diagonalNumbers;
	// };

	// var i = 9;
	// var spiral = Utils.spiral(1, i); // this is clockwise and not anticlockwise, logic's quite the same though
	// for (i += 2; primeRatio(spiral) >= max / 100; i += 2) {
	// 	spiral = Utils.spiral(spiral, i);
	// }
	// return i;

}

module.exports = {
	d: description,
	p: 0.1,
	f: job
}