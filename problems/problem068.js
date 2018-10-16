const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 068     */
/***********************/
Consider the following "magic" 3-gon ring, filled with the numbers 1 to 6, and each line adding to nine.
  4
   \\
    3
   / \\
  1 - 2 - 6
 /
5
Working clockwise, and starting from the group of three with the numerically lowest external node (4,3,2 in this example), each solution can be described uniquely. For example, the above solution can be described by the set: 4,3,2; 6,2,1; 5,1,3.
It is possible to complete the ring with four different totals: 9, 10, 11, and 12. There are eight solutions in total.
Total	Solution Set
9	4,2,3; 5,3,1; 6,1,2
9	4,3,2; 6,2,1; 5,1,3
10	2,3,5; 4,5,1; 6,1,3
10	2,5,3; 6,3,1; 4,1,5
11	1,4,6; 3,6,2; 5,2,4
11	1,6,4; 5,4,2; 3,2,6
12	1,5,6; 2,6,4; 3,4,5
12	1,6,5; 3,5,4; 2,4,6
By concatenating each group it is possible to form 9-digit strings; the maximum string for a 3-gon ring is 432621513.
Using the numbers 1 to 10, and depending on arrangements, it is possible to form 16- and 17-digit strings. What is the maximum 16-digit string for a "magic" 5-gon ring?
`;

function job(gon) {

	// make a list of symbols to be used
	const symbols = '123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	if (gon > symbols.length) {
		throw new Error(`Implement more symbols to handle ${gon}-gon rings`);
	}
	const sValue = function (symbol) {
		return symbols.indexOf(symbol) + 1;
	}

	// get permutations for inner and outter ring (biggest numbers have to be on outter)
	const innerPerms = Utils.permuteAllHeap(symbols.substr(0, gon));
	const outterPerms = Utils.permuteAllHeap(symbols.substr(gon, gon));

	// compute rings to find coherent ones (i.e. each "line" has the same sum)
	const solutions = [];
	innerPerms.forEach((ip) => {
		const innerSet = ip.split('');
		outterPerms.forEach((op) => {
			const outterSet = op.split('');
			let last;
			const solution = [];
			for (var i = gon - 1; i >= 0; i--) { // clockwise-like
				const inner1 = sValue(innerSet[i]),
					inner2 = sValue(innerSet[(i + 1) % gon]),
					outter = sValue(outterSet[i]),
					v = inner1 + inner2 + outter;
				if (!last) {
					last = v;
				} else if (v !== last) {
					return;
				}
				solution.push([outter, inner2, inner1]);
			}
			solutions.push(solution);
		});
	});

	// rearrange solutions (lowest outter node first + rotate in the same direction)
	solutions.forEach((s) => {
		let lowestIndex,
			lowestNode;
		for (let i = 0; i < gon; i++) {
			if (!lowestNode) {
				lowestNode = s[i][0];
				lowestIndex = i;
			} else if (lowestNode > s[i][0]) {
				lowestNode = s[i][0];
				lowestIndex = i;
			}
		}
		for (let i = 0; i < lowestIndex; i++) {
			s.push(s.shift());
		}
	});

	// retrieve the solution we want (no worries about 16-digit: 10 is on the outter ring, so all solutions so far are 16-digit)
	return solutions.map((s) => {
		return s.map((node) => {
			return node.join('');
		}).join('');
	}).sort((a, b) => {
		return parseInt(a, 10) - parseInt(b, 10);
	}).pop();

}

module.exports = {
	d: description,
	p: 5,
	f: job
}