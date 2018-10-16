const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 015     */
/***********************/
Starting in the top left corner of a 2×2 grid, and only being able to move to the right and down, there are exactly 6 routes to the bottom right corner.
(r,r,d,d), (r,d,r,d), (r,d,d,r), (d,r,r,d), (d,r,d,r), (d,d,r,r)
How many such routes are there through a 20×20 grid?
`;

function job(size) {

	// should work... if given enough time. :/
	// var width = size;
	// var height = size;
	// var stepper = function (x, y) {
	// 	if (x === width || y === height) {
	// 		return 1;
	// 	}
	// 	return stepper(x + 1, y) + stepper(x, y + 1);
	// }
	// return stepper(0, 0);

	// conjecture: the computed series up to 16 provides the central binomial coefficients sequence, thus:
	// routes = (2n)!/(n!)^2
	const fsize = Utils.factorial(size);
	return Utils.factorial(2 * size) / (fsize * fsize);
}

module.exports = {
	d: description,
	p: 20,
	f: job
}

/*
1=2
2=6
3=20
4=70
5=252
6=924
7=3432
8=12870
*/