const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 060     */
/***********************/
The primes 3, 7, 109, and 673, are quite remarkable. By taking any two primes and concatenating them in any order the result will always be prime. For example, taking 7 and 109, both 7109 and 1097 are prime. The sum of these four primes, 792, represents the lowest sum for a set of four primes with this property.
Find the lowest sum for a set of five primes for which any two primes concatenate to produce another prime.
`;

function job(size, mode) {

	const lookupLowestSet = function (root, possibles, size) {
		const subset = [];
		for (const p of possibles) {
			if (Utils.isPrime(parseInt(`${root}${p}`, 10)) && Utils.isPrime(parseInt(`${p}${root}`, 10))) {
				if (size === 1) {
					return [root, p];
				}
				subset.push(p);
			}
		}
		if (size === 1) {
			return null;
		}
		size--;
		const record = {
			subset: [],
			sum: Infinity
		};
		while (subset.length) {
			const result = lookupLowestSet(subset.shift(), subset, size);
			if (!result) {
				continue;
			}
			const addedResult = result.reduce((acc, cur) => {
				return acc + cur;
			}, 0);
			if (record.sum > addedResult) {
				record.sum = addedResult;
				record.subset = result;
			}
		}
		if (record.subset.length) {
			record.subset.unshift(root);
			return record.subset;
		}
		return null;
	};

	const launchLookup = function (size, limit = 10000) {
		const primes = Utils.primesToLimit(limit);
		let set;
		const record = {
			set: [],
			sum: Infinity
		};
		while (primes.length) {
			const p = primes.shift();
			set = lookupLowestSet(p, primes, size - 1);
			if (!set) {
				continue;
			}
			const addedSet = set.reduce((acc, cur) => {
				return acc + cur;
			}, 0);
			if (record.sum > addedSet) {
				record.sum = addedSet;
				record.set = set;
			}
		}
		if (!record.set.length) {
			return launchLookup(size, limit * 10);
		}
		if (record.sum > limit && mode !== 'UNSAFE') {
			// no limit!
			return launchLookup(size, record.sum)
		}
		return record.sum;
	}

	return launchLookup(size);

}

module.exports = {
	d: description,
	p: [5, 'UNSAFE'],
	f: job
}