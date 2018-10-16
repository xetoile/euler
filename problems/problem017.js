const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 017     */
/***********************/
If the numbers 1 to 5 are written out in words: one, two, three, four, five, then there are 3 + 3 + 5 + 4 + 4 = 19 letters used in total.
If all the numbers from 1 to 1000 (one thousand) inclusive were written out in words, how many letters would be used?
NOTE: Do not count spaces or hyphens. For example, 342 (three hundred and forty-two) contains 23 letters and 115 (one hundred and fifteen) contains 20 letters. The use of "and" when writing out numbers is in compliance with British usage.
`;

function job(target) {

	const n2w = require('numbers2words'), // cheating when it's boring
		translator = new n2w('EN_US');
	let count = 0;
	for (let i = 1; i <= target; i++) {
		count += translator.toWords(i).replace(/ -/, '').length;
	}
	return count;

}

module.exports = {
	d: description,
	p: 1000,
	f: job
}