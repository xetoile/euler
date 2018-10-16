const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 032     */
/***********************/
We shall say that an n-digit number is pandigital if it makes use of all the digits 1 to n exactly once; for example, the 5-digit number, 15234, is 1 through 5 pandigital.
The product 7254 is unusual, as the identity, 39 × 186 = 7254, containing multiplicand, multiplier, and product is 1 through 9 pandigital.
Find the sum of all products whose multiplicand/multiplier/product identity can be written as a 1 through 9 pandigital.
HINT: Some products can be obtained in more than one way so be sure to only include it once in your sum.
`;

function job(min, max) {

	let identity = '';
	for (var i = min; i <= max; i++) {
		identity += `${i}`;
	}
	identity = identity.split('').sort().join('');	// just to be sure...


	// always shaped as n = n - 1 digits
	if (identity.length % 2 === 0) {
		throw new Error('Need odd range');
	}
	const leftDigits = Math.ceil(identity.length / 2);
	// let's say the multiplicand is always the smallest of the two
	const multiplicandMaxDigits = Math.floor(leftDigits / 2);

	const results = [];
	for (let multiplicandDigits = 1; multiplicandDigits <= multiplicandMaxDigits; multiplicandDigits++) {
		const multiplierDigits = leftDigits - multiplicandDigits,
			multiplicandStart = Math.pow(10, multiplicandDigits - 1),
			multiplicandLimit = multiplicandStart * 10,
			multiplierStart = Math.pow(10, multiplierDigits - 1),
			multiplierLimit = multiplierStart * 10;
		for (let multiplicand = multiplicandStart; multiplicand < multiplicandLimit; multiplicand++) {
			for (let multiplier = multiplierStart; multiplier < multiplierLimit; multiplier++) {
				const product = multiplicand * multiplier;
				// suppose the "hint" tells about prime factors and how a product has to be unique... anyway, easier to check an array
				if (identity === `${multiplicand}${multiplier}${product}`.split('').sort().join('') && !results.includes(product)) {
					results.push(product);

				}
			}
		}
	}

	return results.reduce((acc, cur) => {
		return acc + cur;
	});

}


module.exports = {
	d: description,
	p: [1, 9],
	f: job
}