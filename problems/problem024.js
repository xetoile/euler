const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 024     */
/***********************/
A permutation is an ordered arrangement of objects. For example, 3124 is one possible permutation of the digits 1, 2, 3 and 4.
If all of the permutations are listed numerically or alphabetically, we call it lexicographic order.
The lexicographic permutations of 0, 1 and 2 are:
012   021   102   120   201   210
What is the millionth lexicographic permutation of the digits 0, 1, 2, 3, 4, 5, 6, 7, 8 and 9?
`;

function job(digits, position) {

	const alphabet = digits.split('');

	const cycles = alphabet.map((digit, index) => {
		return Utils.factorial(alphabet.length - 1 - index);
	});

	const extractDigit = function (index, alphabet, remainder) {
		if (alphabet.length === 1) {
			return alphabet[0];
		}
		const cycle = cycles[index],
			point = Math.floor(remainder / cycle) % alphabet.length;
		return alphabet.splice(point, 1)[0] + extractDigit(index + 1, alphabet, position - point * cycle);
	};
	return extractDigit(0, alphabet, position - 1);	// position 0 = 1st permutation

}

module.exports = {
	d: description,
	p: ['0123456789', 1000000],
	f: job
}