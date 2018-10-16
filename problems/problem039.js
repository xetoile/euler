const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 039     */
/***********************/
If p is the perimeter of a right angle triangle with integral length sides, {a,b,c}, there are exactly three solutions for p = 120.
{20,48,52}, {24,45,51}, {30,40,50}
For which value of p ≤ 1000, is the number of solutions maximised?
`;

function job(max) {

	const record = {
		size: 0,
		p: 0
	};
	for (let p = max; p > 0; p--) {
		const triplets = Utils.pythagoreanTriplets(p);
		if (triplets.length > record.size) {
			record.size = triplets.length;
			record.p = p;
		}
	}
	return record.p;

}

module.exports = {
	d: description,
	p: 1000,
	f: job
}