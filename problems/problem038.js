const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 038     */
/***********************/
Take the number 192 and multiply it by each of 1, 2, and 3:
    192 × 1 = 192
    192 × 2 = 384
    192 × 3 = 576
By concatenating each product we get the 1 to 9 pandigital, 192384576. We will call 192384576 the concatenated product of 192 and (1,2,3)
The same can be achieved by starting with 9 and multiplying by 1, 2, 3, 4, and 5, giving the pandigital, 918273645, which is the concatenated product of 9 and (1,2,3,4,5).
What is the largest 1 to 9 pandigital 9-digit number that can be formed as the concatenated product of an integer with (1,2, ... , n) where n > 1?
`;

function job(max) {

	let ns = "";
	for (let i = max; i >= 1; i--) {
		ns += i;
	}
	do {
		for (let cursor = 1; cursor <= Math.floor(max / 2); cursor++) {
			let concatenatedProduct = ns.substr(0, cursor),
				n = 2;
			const root = parseInt(concatenatedProduct, 10);
			do {
				concatenatedProduct += n * root;
				n++;
			} while (concatenatedProduct.length < max);
			if (concatenatedProduct === ns) {
				return concatenatedProduct;
			}
		}
	} while (ns = Utils.permute(ns, true));



}

module.exports = {
	d: description,
	p: 9,
	f: job
}