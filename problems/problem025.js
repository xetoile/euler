const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 025     */
/***********************/
The Fibonacci sequence is defined by the recurrence relation:
    Fn = Fn−1 + Fn−2, where F1 = 1 and F2 = 1.
Hence the first 12 terms will be:
    F1 = 1
    F2 = 1
    F3 = 2
    F4 = 3
    F5 = 5
    F6 = 8
    F7 = 13
    F8 = 21
    F9 = 34
    F10 = 55
    F11 = 89
    F12 = 144
The 12th term, F12, is the first term to contain three digits.
What is the index of the first term in the Fibonacci sequence to contain 1000 digits?
`;

function job(digitAmount) {

	const BigNumber = Utils.BigNumber,
	   f = [new BigNumber(1), new BigNumber(1)];
	let index = 2;
	while (f[1].toString().length < digitAmount) {
		const tmp = f.shift();
		f.push(tmp.plus(f[0]));
		index++;
	}
	return index;

}

module.exports = {
	d: description,
	p: 1000,
	f: job
}