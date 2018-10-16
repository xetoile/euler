const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 028     */
/***********************/
Starting with the number 1 and moving to the right in a clockwise direction a 5 by 5 spiral is formed as follows:
21 22 23 24 25
20  7  8  9 10
19  6  1  2 11
18  5  4  3 12
17 16 15 14 13
It can be verified that the sum of the numbers on the diagonals is 101.
What is the sum of the numbers on the diagonals in a 1001 by 1001 spiral formed in the same way?
`;

function job(size, root) {

	const spiral = Utils.spiral(root, size);

	let sum = 0;
	for (let p = 0; p < size; p++) {
		sum += spiral[p][p] + spiral[p][size - 1 - p];
	}
	return sum - root;	// because root was counted twice (2 diagonals)

}

module.exports = {
	d: description,
	p: [1001, 1],
	f: job
}