const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 062     */
/***********************/
The cube, 41063625 (345^3), can be permuted to produce two other cubes: 56623104 (384^3) and 66430125 (405^3). In fact, 41063625 is the smallest cube which has exactly three permutations of its digits which are also cube.
Find the smallest cube for which exactly five permutations of its digits are cube.
`;

function job(cubicPermsRequired) {

	// declare starting root
	let n = 0;
	while (Utils.factorial(++n) < cubicPermsRequired);
	let i = Math.floor(Math.cbrt(10 ** (n - 1))) - 1;

	let cube, cubicPerms, cubes = {};
	mainLoop: do {
		cube = `${++i ** 3}`;
		for (const c of Object.keys(cubes)) {
			if (Utils.isPermutation(c, cube)) {
				cubicPerms = ++cubes[c];
				cube = c;
				continue mainLoop;
			}
		}
		cubes[cube] = 1;
	} while (cubicPerms !== cubicPermsRequired);
	return cube;
}

module.exports = {
	d: description,
	p: 5,
	f: job
}