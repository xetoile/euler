const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 061     */
/***********************/
Triangle, square, pentagonal, hexagonal, heptagonal, and octagonal numbers are all figurate (polygonal) numbers and are generated by the following formulae:
Triangle 	  	P3,n=n(n+1)/2 	  	1, 3, 6, 10, 15, ...
Square 	  		P4,n=n^2 	  		1, 4, 9, 16, 25, ...
Pentagonal 	  	P5,n=n(3n−1)/2 	  	1, 5, 12, 22, 35, ...
Hexagonal 	  	P6,n=n(2n−1) 	  	1, 6, 15, 28, 45, ...
Heptagonal 	  	P7,n=n(5n−3)/2 	  	1, 7, 18, 34, 55, ...
Octagonal 	  	P8,n=n(3n−2) 	  	1, 8, 21, 40, 65, ...
The ordered set of three 4-digit numbers: 8128, 2882, 8281, has three interesting properties.
    The set is cyclic, in that the last two digits of each number is the first two digits of the next number (including the last number with the first).
    Each polygonal type: triangle (P3,127=8128), square (P4,91=8281), and pentagonal (P5,44=2882), is represented by a different number in the set.
    This is the only set of 4-digit numbers with this property.
Find the sum of the only ordered set of six cyclic 4-digit numbers for which each polygonal type: triangle, square, pentagonal, hexagonal, heptagonal, and octagonal, is represented by a different number in the set.
`;

function job() {

	// returns only the max (positive) solution
	const solve = function (v, p) {
		const delta = p[1] ** 2 - 4 * p[0] * (p[2] - v);
		return (Math.sqrt(delta) - p[1]) / (2 * p[0]);
	};
	// prototype for formulae's subobjects
	const formulaTemplate = {
		start: function (bound) {
			return Math.ceil(solve(bound, this.polynomial));
		},
		end: function (bound) {
			return Math.floor(solve(bound, this.polynomial));
		},
		get: function (n) {
			return Math.round(this.polynomial[0] * n ** 2 + this.polynomial[1] * n + this.polynomial[2]);
		}
	};
	// polynomials[i] = P<i+offset>,<n>
	const offset = 3;
	const polynomials = [
		[.5, .5, 0],
		[1, 0, 0],
		[1.5, -.5, 0],
		[2, -1, 0],
		[2.5, -1.5, 0],
		[3, -2, 0]
	];

	const formulae = {};
	polynomials.forEach((p, i) => {
		formulae[i + offset] = Object.create(formulaTemplate);
		formulae[i + offset].polynomial = p;
	});

	const sets = [];
	// TODO: set params?
	const lowerBound = 1000;
	const higherBound = 9999;
	polynomials.forEach((p, index) => {
		const type = index + offset,
			start = formulae[type].start(lowerBound),
			end = formulae[type].end(higherBound),
			set = [];
		for (let n = start; n <= end; n++) {
			set.push(formulae[type].get(n));
		}
		sets.push(set);
	});

	const lookup = function (excludedIndices = [], chain = []) {
		if (excludedIndices.length === sets.length) {
			if (`${chain[chain.length - 1]}`.substr(2) !== `${chain[0]}`.substr(0, 2)) {
				return null;
			}
			return chain;
		}
		for (let i = 0; i < sets.length; i++) {
			if (excludedIndices.includes(i)) {
				continue;
			}
			for (let j = 0; j < sets[i].length; j++) {
				if (chain.length) {
					var last = chain[chain.length - 1];
					if (`${last}`.substr(2) !== `${sets[i][j]}`.substr(0, 2)) {
						continue;
					}
				}
				const fullChain = lookup(excludedIndices.concat([i]), chain.concat([sets[i][j]]));
				if (fullChain) {
					return fullChain;
				}
			}
		}
	};

	return lookup().reduce((acc, cur) => {
		return acc + cur;
	});

}

module.exports = {
	d: description,
	p: null,
	f: job
}