const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 040     */
/***********************/
An irrational decimal fraction is created by concatenating the positive integers:
0.123456789101112131415161718192021...
It can be seen that the 12th digit of the fractional part is 1.
If dn represents the nth digit of the fractional part, find the value of the following expression.
d1 × d10 × d100 × d1000 × d10000 × d100000 × d1000000
`;

function job(targets) {

	targets.sort((a, b) => {
		return a - b;
	});

	const digits = [];
		max = targets[targets.length - 1];
	let length = 0,
		current = targets.shift();
	for (let i = 1; length <= max; i++) {
		const si = `${i}`;
		length += si.length;
		if (length >= current) {
			digits.push(parseInt(si.charAt(si.length - 1 - (length - current)), 10));
			current = targets.shift();
		}
	}
	return digits.reduce((acc, cur) => {
		return acc * cur;
	});
}

module.exports = {
	d: description,
	p: [[1, 10, 100, 1000, 10000, 100000, 1000000]],
	f: job
}