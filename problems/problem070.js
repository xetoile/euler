const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 070     */
/***********************/
Euler''s Totient function, φ(n) [sometimes called the phi function], is used to determine the number of positive numbers less than or equal to n which are relatively prime to n. For example, as 1, 2, 4, 5, 7, and 8, are all less than nine and relatively prime to nine, φ(9)=6.
The number 1 is considered to be relatively prime to every positive number, so φ(1)=1.
Interestingly, φ(87109)=79180, and it can be seen that 87109 is a permutation of 79180.
Find the value of n, 1 < n < 10^7, for which φ(n) is a permutation of n and the ratio n/φ(n) produces a minimum.
`;

function job(limit) {
	
	const record = {
		n: 0,
		phi: 0,
		ratio: Infinity
	};
	const t = {
		phi: 0,
		perm: 0
	};

	for (let n = 2; n < limit; n++) {
		let t0 = Date.now();
		const product = Utils.phi(n);
		t.phi += Date.now() - t0;
		t0 = Date.now();
		if (!Utils.isPermutation(n, product)) {
			t.perm += Date.now() - t0;
			continue;
		}
		t.perm += Date.now() - t0;
		const ratio = n / product;
		if (ratio < record.ratio) {
			record.n = n;
			record.ratio = ratio;
			record.phi = product;
		}	
	}

	console.log(record);
	console.log(t);

	return record.n;

}

module.exports = {
	d: description,
	p: 10 ** 7,
	f: job
}