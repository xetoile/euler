const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 026     */
/***********************/
A unit fraction contains 1 in the numerator. The decimal representation of the unit fractions with denominators 2 to 10 are given:
    1/2	= 	0.5
    1/3	= 	0.(3)
    1/4	= 	0.25
    1/5	= 	0.2
    1/6	= 	0.1(6)
    1/7	= 	0.(142857)
    1/8	= 	0.125
    1/9	= 	0.(1)
    1/10	= 	0.1 
Where 0.1(6) means 0.166666..., and has a 1-digit recurring cycle. It can be seen that 1/7 has a 6-digit recurring cycle.
Find the value of d < 1000 for which 1/d contains the longest recurring cycle in its decimal fraction part.
`;

function job(max) {

	const divide = function (d, q, r) {
		// do the division
		const n = r.length ? r[r.length - 1] * 10 : 10,
			_q = Math.floor(n / d),
			_r = n % d;
		// check stopping condition (found a cycle)
		for (let i = 0; i < q.length; i++) {
			if (q[i] === _q && r[i] === _r) {
				return q.length - i;
			}
		}
		// feed the memory and keep going...
		q.push(_q);
		r.push(_r);
		// ...unless the division is finite
		if (!_r) {
			return 0;
		}
		return divide(d, q, r);
	}

	const record = {
		d: 0,
		length: 0,
		cycle: '0',
		computed: '0.0'
	}
	for (let d = 1; d < max; d++) {
		let controlQuantity = [],
			measuredLength = divide(d, controlQuantity, []);
		if (measuredLength > record.length) { // TODO: this should not be a sufficient condition to record (could be finite)
			record.d = d;
			record.length = measuredLength;
			record.cycle = controlQuantity.splice(controlQuantity.length - measuredLength, measuredLength).join('');
			record.computed = `0.${controlQuantity.join('')}(${record.cycle})`
		}
	}
	
	return record.d;

}

module.exports = {
	d: description,
	p: 1000,
	f: job
}