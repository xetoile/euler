const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 066     */
/***********************/
Consider quadratic Diophantine equations of the form:
x^2 – Dy^2 = 1
For example, when D=13, the minimal solution in x is 649^2 – 13×180^2 = 1.
It can be assumed that there are no solutions in positive integers when D is square.
By finding minimal solutions in x for D = {2, 3, 5, 6, 7}, we obtain the following:
3^2 – 2×2^2 = 1
2^2 – 3×1^2 = 1
9^2 – 5×4^2 = 1
5^2 – 6×2^2 = 1
8^2 – 7×3^2 = 1
Hence, by considering minimal solutions in x for D ≤ 7, the largest x is obtained when D=5.
Find the value of D ≤ 1000 in minimal solutions of x for which the largest value of x is obtained.
`;

function job(max) {

	// augments PQa's data structure with the period, bases its stopping call on it
	const stopper = function (data) {
		if (!data.l && data.a[data.a.length - 1] === 2 * data.a[0]) {
			data.l = data.a.length - 1;
		}
		if (data.l) {
			if (data.l % 2 === 0) {
				return true;
			} else {
				return data.a.length === 2 * data.l;
			}
		}
		return false;
	};
	const record = {
		x: 0,
		y: 0,
		d: 0
	};
	let data;
	for (let d = 2; d <= max; d++) {
		try {
			data = Utils.PQa(0, 1, d, stopper);
		} catch (err) {
			continue; // PQa's requirements not met (d is square)
		}
		if (data.l % 2 === 0) {
			const i = data.l - 1;
			if (record.x < data.G[i]) {
				record.x = data.G[i];
				record.y = data.B[i];
				record.d = d;
			}
		} else {
			const i = 2 * data.l - 1;
			if (record.x < data.G[i]) {
				record.x = data.G[i];
				record.y = data.B[i];
				record.d = d;
			}
		}
	}
	return record.d;

}

module.exports = {
	d: description,
	p: 1000,
	f: job
}