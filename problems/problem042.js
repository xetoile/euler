const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 042     */
/***********************/
The nth term of the sequence of triangle numbers is given by, tn = ½n(n+1); so the first ten triangle numbers are:
1, 3, 6, 10, 15, 21, 28, 36, 45, 55, ...
By converting each letter in a word to a number corresponding to its alphabetical position and adding these values we form a word value. For example, the word value for SKY is 19 + 11 + 25 = 55 = t10. If the word value is a triangle number then we shall call the word a triangle word.
Using words.txt (right click and 'Save Link/Target As...'), a 16K text file containing nearly two-thousand common English words, how many are triangle words?
`;

function job(file) {

	// idea from problem022
	const list = JSON.parse(`[${Utils.asset(file).toUpperCase()}]`);
	const codeOffset = "A".charCodeAt(0) - 1; // -1 so that "A"-codeOffset=1
	let triangleWords = 0;
	for (const word of list) {
		let sum = 0;
		for (let i = 0; i < word.length; i++) {
			sum += word.charCodeAt(i) - codeOffset;
		}
		if (Utils.isTriangle(sum)) {
			triangleWords++;
		}
	}
	return triangleWords;

}

module.exports = {
	d: description,
	p: 'p042_words.txt',
	f: job
}