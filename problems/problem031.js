const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 031     */
/***********************/
In England the currency is made up of pound, £, and pence, p, and there are eight coins in general circulation:
    1p, 2p, 5p, 10p, 20p, 50p, £1 (100p) and £2 (200p).
It is possible to make £2 in the following way:
    1×£1 + 1×50p + 2×20p + 1×5p + 1×2p + 3×1p
How many different ways can £2 be made using any number of coins?
`;

function job(target, possibles) {

	possibles = possibles.sort(function (a, b) {
		return b - a;
	});

	const parser = function (possibles, counting = 0) {
		let i = 0,
			count = 0;
		const remaining = possibles.map((x) => {
			return x;
		});
		const current = remaining.shift();
		while (i * current + counting < target) {
			if (remaining.length) {
				count += parser(remaining, i * current + counting);
			}
			i++;
		}
		return (i * current + counting === target) + count;
	}

	return parser(possibles);

}


module.exports = {
	d: description,
	p: [200, [1, 2, 5, 10, 20, 50, 100, 200]],
	f: job
}