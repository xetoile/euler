const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 057     */
/***********************/
It is possible to show that the square root of two can be expressed as an infinite continued fraction.
√ 2 = 1 + 1/(2 + 1/(2 + 1/(2 + ... ))) = 1.414213...
By expanding this for the first four iterations, we get:
1 + 1/2 = 3/2 = 1.5
1 + 1/(2 + 1/2) = 7/5 = 1.4
1 + 1/(2 + 1/(2 + 1/2)) = 17/12 = 1.41666...
1 + 1/(2 + 1/(2 + 1/(2 + 1/2))) = 41/29 = 1.41379...
The next three expansions are 99/70, 239/169, and 577/408, but the eighth expansion, 1393/985, is the first example where the number of digits in the numerator exceeds the number of digits in the denominator.
In the first one-thousand expansions, how many fractions contain a numerator with more digits than denominator?
`;

function job(max) {

	const expansion = function (rank) {
		if (rank === 1) {
			return [new Utils.BigNumber(1), new Utils.BigNumber(2)];
		}
		const data = expansion(rank - 1);
		return [data[1], data[0].plus(data[1].times(2))];
	};

	let amount = 0;
	for (let i = 1; i <= max; i++) {
		const data = expansion(i),
			d = data[1],
			n = data[0].plus(d); // +d to make for the "1 +" at the beginning
		if (`${n}`.length > `${d}`.length) {
			amount++;
		}
	}
	return amount;

}

module.exports = {
	d: description,
	p: 1000,
	f: job
}