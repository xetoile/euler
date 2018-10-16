const fs = require('fs'),
	Path = require('path'),
	BigNumber = require('bignumber.js');

// ensure precision when used
BigNumber.config({
	EXPONENTIAL_AT: [-7, 1000000]
});

// caches and the like, not exported
const internals = {
	timer: {
		last: 0,
		count: 1
	},
	factorial: {
		cache: [new BigNumber(1), new BigNumber(1)], // 0! and 1! =1
		innerLoop: function (n) {
			if (this.cache[n]) {
				return this.cache[n];
			}
			return this.cache[n] = this.innerLoop(n - 1).times(n);
		}
	},
	primes: {
		last: 2,
		cache: [2]
	}
};

const Utils = module.exports = {

	/*
	Timing helper, mainly for debugging / optimizing / check bottlenecks
	*/
	timer: {
		start: function () {
			internals.timer.last = Date.now();
			internals.timer.count = 1;
		},
		checkpoint: function (name) {
			name = name || `#${internals.timer.count++}`;
			console.log(`Time checkpoint ${name}: +${Date.now() - internals.timer.last}ms.`);
			internals.timer.last = Date.now();
		}
	},

	/*
	File getter for assets
	@returns String
	*/
	asset: function (name) {
		return fs.readFileSync(Path.join(__dirname, '../assets/' + name)).toString();
	},

	/*
	Avoids requiring
	*/
	BigNumber: BigNumber,

	/*
	Prime factors of `ref`, ascending order
	@returns Array<Number>
	*/
	primeFactors: function (ref, unique = false) {
		const f = [];
		let n = ref;
		for (let d = 2; d <= n / d; d++) {
			if (n % d === 0) {
				do {
					f.push(d);
					n = n / d;
				} while (n % d === 0);
			}
		}
		if (n > 1 && n < ref) {
			f.push(n);
		}
		return unique ? Array.from(new Set(f)) : f;
	},

	/*
	Euler's phi function, based on Euler's product formula:
	phi(n) = n * PROD(p|n)(1 - 1/p) with p a prime divisor of n
	@returns Number
	*/
	phi: function (n) {
		const factors = this.primeFactors(n, true);
		if (!factors.length) {
			factors.push(n); // n is a prime divisor of itself
		}
		const product = [n, 1];
		for (const f of factors) {
			product[0] *= f - 1;
			product[1] *= f;
		}
		return Math.round(product[0] / product[1]); // product should be integer
	},

	/*
	Reduces a fraction to its smallest numerator and denominator
	Takes an array where [0] is numerator and [1] is denominator
	@returns Array<Number>
	*/
	reduceFraction: function ([n, d]) {
		const nf = this.primeFactors(n, false);
		if (!nf.length) {
			nf.push(n);
		}
		const df = this.primeFactors(d, false);
		if (!df.length) {
			df.push(d);
		}
		const ni = [];
		nf.forEach((p, index) => {
			const i = df.indexOf(p);
			if (i > -1) {
				df.splice(i, 1);
				ni.push(index);
			}
		});
		ni.reverse().forEach((i) => {
			nf.splice(i, 1);
		});
		return [
			nf.reduce((a, i) => {
				return a * i;
			}, 1),
			df.reduce((a, i) => {
				return a * i;
			}, 1)
		];
	},

	/*
	Proper divisors of `n` (i.e. numbers less than `n` which divide evenly into `n`), ascending order
	@returns Array<Number>
	*/
	properDivisors: function (n) {
		const divisors = [1];
		for (let i = 2; i < n / i; i++) {
			if (n % i === 0) {
				divisors.push(i);
				divisors.push(n / i);
			}
		}
		return divisors;
	},

	/*
	Whether `n` is prime
	Tries to read cache to help dividing if it exists
	@returns Boolean
	*/
	isPrime: function (n) {
		if (n < 2) {
			return false;
		}
		const cache = internals.primes.cache;
		// no init of `last`: `internals.primes.cache` has always at least 1 value
		let last;
		for (let i = 0; i < cache.length && (last = cache[i]) <= n / cache[i]; i++) {
			if (n % cache[i] === 0) {
				return false;
			}
		}
		if (last > n / last) {
			return true;
		}
		if (cache.length === 1) {
			// case: 2 is the only even prime
			last--;
		}
		for (let i = last + 2; i <= n / i; i += 2) {
			if (n % i === 0) {
				return false;
			}
		}
		return true;
	},

	/*
	Finds the next prime after `start`
	No cache
	@returns Number
	*/
	nextPrime: function (start) {
		let i = start - 1 + (start % 2);
		while (!this.isPrime(i += 2));
		return i;
	},

	/*
	Provides the list of primes up to `limit` included; uses cache
	Based on the sieve of Eratosthenes
	@returns Array<Number>
	*/
	primesToLimit: function (limit) {
		if (limit < 2) {
			return [];
		}
		const primes = internals.primes;
		if (limit <= primes.last) {
			const index = primes.cache.findIndex((n) => {
				return n > limit;
			});
			return primes.cache.slice(
				0,
				index < 0 ? primes.cache.length : index
			);
		}
		for (let i = 1; i <= limit - primes.last; i++) {
			const current = primes.last + i;
			let isPrime = true,
				p = 0;
			for (let pi = 0; pi < primes.cache.length && p <= current / p; pi++) {
				p = primes.cache[pi];
				if (current % p === 0) {
					isPrime = false;
					break;
				}
			}
			if (isPrime) {
				primes.cache.push(current);
			}
		}
		primes.last = limit;
		return primes.cache.slice();
	},

	/*
	Provides `position` first primes
	Reads and feeds `internals.primes.cache`
	@returns Array<Number>
	*/
	primesToPosition: function (position) {
		const primes = internals.primes;
		if (position <= primes.cache.length) {
			return primes.cache.slice(0, position);
		}
		let current = primes.last,
			counter = primes.cache.length;
		while (counter < position) {
			current++; // TODO: optimize (+=2?)
			if (Utils.isPrime(current)) {
				primes.cache.push(current);
				counter++;
			}
		}
		primes.last = current;
		return primes.cache.slice();
	},


	/*
	Factorial computation with memoization, based on BigNumber
	@returns Number|String
	*/
	factorial: function (n, toNumber = true) {
		var outputFn = toNumber ? 'toNumber': 'toString';
		return internals.factorial.innerLoop(n)[outputFn]();
	},

	/*
	Triangle number computation with memoization
	@returns Number
	*/
	triangle: function (n) {
		return (n * n + n) / 2;	// given by problem042
	},

	/*
	Tells whether `n` is a triangle number
	@returns Boolean
	*/
	isTriangle: function (n) {
		return !!this.reverseTriangle(n); // 0 is not a triangle root, hence truthy/falsy is OK
	},

	/*
	Finds the root number that gives triangle number `n`
	@returns Number|Boolean false if `n` was not a triangle
	*/
	reverseTriangle: function (n) {
		const delta = 1 + 8 * n;
		if (delta <= 0) {
			return false;
		}
		const root = Math.sqrt(delta);
		//if (Math.floor(root) ** 2 !== delta) {
		if ((root | 0) !== root) {	// TODO: not sure how this works, but it does check integer status...
			return false;
		}
		const solution = (root - 1) / 2;
		if ((solution | 0) === solution) {
			return solution;
		}
		return false;
	},

	/*
	Tells whether a number is pentagonal
	Wikipedia: a number x is pentagonal if (sqrt(24x+1)+1)/6 is natural
	@returns Boolean
	*/
	isPentagon: function (n) {
		const test = (Math.sqrt(24 * n + 1) + 1) / 6;
		return (test | 0) === test;
	},

	/*
	Provides the `n`th pentagonal number
	@returns Number
	*/
	pentagon: function (n) {
		return (3 * n * n - n) / 2;
	},

	/*
	Provides the difference between (`n`+1)th pentagon and `n`th pentagon
	@returns Number
	*/
	toNextPentagon: function (n) {
		return (6 * n + 2) / 2;
	},

	/*
	Provides the `n`th hexagonal number
	@returns Number
	*/
	hexagon: function (n) {
		return 2 * n * n - n;
	},

	/*
	Provides the difference between (`n`+1)th pentagon and `n`th pentagon
	@returns Number
	*/
	toNextHexagon: function (n) {
		return 4 * n + 1;
	},

	/*
	Splits an integer into its digits
	@returns Array<Number>
	*/
	toDigits: function(n) {
		return `${n}`.split('').map((f) => {
			return parseInt(f, 10);
		})
	},

	/*
	Provides the number of occurrences for each digit in a {digit: occurrences} structure
	@returns Object
	*/
	digitsDirectory: function (s) {
		const out = {};
		`${s}`.split('').forEach((d) => {
			if (out[d]) {
				out[d]++;
			} else {
				out[d] = 1;
			}
		});
		return out;
	},

	/*
	Tells whether the string representation of `x` is a palindrome
	@returns Boolean
	*/
	isPalindrome: function (x) {
		const local = `${x}`.split('');
		while (local.length > 1) {
			if (local.shift() !== local.pop()) {
				return false;
			}
		}
		return true;
	},

	/*
	Whether `n` is pandigital, optionally reinforced by `length` check
	@returns Boolean
	*/
	isPandigital: function (n, length) {
		const identity = '123456789',
			sn = `${n}`;
		return (sn.length === length || sn.length)
		// TODO: really need RegExp? --> identity === sn.split('').sort().join('')
			&& identity.match(new RegExp('^' + sn.split('').sort().join('')));
	},

	/*
	Classic algorithm for next (or `prev`ious) permutation by Narayana Pandita
	@returns String|Boolean false if no more permutations
	*/
	permute: function (s, prev = false) {
		const digits = `${s}`.split(''),
			prevInverter = 1 - 2 * prev;
		let highestIndex = -1;
		for (let i = digits.length - (prev ? 1 : 2); i >= 0; i--) {
			if (digits[i] < digits[i + prevInverter]) {
				highestIndex = i;
				break;
			}
		}
		if (highestIndex < 0) {
			return false;
		}
		if (prev) {
			highestIndex--;
		}
		for (let i = digits.length - 1; i > highestIndex; i--) {
			if ((prev + (digits[highestIndex] < digits[i])) % 2) {
				const tmp = digits[i];
				digits[i] = digits[highestIndex];
				digits[highestIndex] = tmp;
				break;
			}
		}
		return digits.slice(0, highestIndex + 1).concat(digits.slice(highestIndex + 1).reverse()).join('');
	},

	/*
	Provides all possible permutations, sorted
	Based on `this.permute`
	@returns Array<String>
	*/
	permuteAll: function (s, desc = false) {
		const out = [];
		let current;
		// first, reset to first/last permutation
		while (current = this.permute(s, !desc)) {
			s = current;
		}
		while (current = this.permute(s, desc)) {
			out.push(current);
			s = current;
		}
		return out;
	},

	/*
	Faster way of retrieving all possible permutations, unsorted
	Based on Heap's algorithm
	@returns Array<String>
	*/
	permuteAllHeap: function (s, unique = false) {
		const a = s.split(''),
			n = a.length,
			c = Array(n).fill(0),
			method = unique ? 'add' : 'push',
			out = unique ? new Set([s]) : [s];
		let i = 0;
		while (i < n) {
			if (c[i] < i) {
				const src = i % 2 ? c[i] : 0,
					tmp = a[i];
				a[i] = a[src];
				a[src] = tmp;
				out[method](a.join(''));
				c[i]++;
				i = 0;
			} else {
				c[i] = 0;
				i++;
			}
		}
		return unique ? Array.from(out) : out;
	},

	/*
	Tells whether `dst` and `src` are permutations of the same set
	*/
	isPermutation: function (src, dst) {
		const empty = '';
		src = empty + src;
		dst = empty + dst;
		if (src.length !== dst.length) {
			return false;
		}
		for (let i = 0; i < src.length; i++) {
			dst = dst.replace(src[i], empty);
		}
		return !dst.length;
	},

	/*
	Finds all possible right angle triangle integral side lengths for a given `perimeter`
	@returns Array<Number>
	*/
	pythagoreanTriplets: function (perimeter) {
		const triplets = [];
		for (let a = 1; a < perimeter / 3 - 1; a++) {
			for (let b = a + 1; b < perimeter / 2 - 1; b++) {
				const c = Math.sqrt(a * a + b * b);
				if (a + b + c === perimeter) {
					triplets.push([a, b, c]);
				}
			}
		}
		return triplets;
	},

	/*
	Provides all combinations from a `set` for a given `size` (with duplicates allowed)
	@throws Error if required `size` is larger than elements in `set`
	@returns Array<String>
	*/
	combineAll: function (set, size) {
		if (!Array.isArray(set)) {
			set = set.split('');
		}
		if (set.length < size) {
			throw new Error('Cyclic combinations not implemented');
		}
		const innerLoop = function (set, size) {
			if (size === 1) {
				return set;
			}
			const out = [];
			for (let i = 0; i < set.length; i++) {
				out.push.apply(
					out,
					innerLoop(set, size - 1).map((w) => {
						return `${set[i]}${w}`;
					})
				);
			}
			return out;
		};
		return innerLoop(set, size);
	},

	/*
	Provides a clockwise spiral starting with value `rootOrSpiral` of side length `size`
	May augment an existing spiral if 2D array provided  as 1st arg
	@throws Error if `rootOrSpiral` is a spiral and `size` is lower than existing side length
	@throws Error if `size` is even
	@returns Array<Array<Number>>
	*/
	spiral: function (rootOrSpiral, size) {
		if (size % 2 === 0) {
			throw new Error('Cannot spiral on even size');
		}
		let spiral, coords, i, max;
		// init if-else block
		if (Array.isArray(rootOrSpiral)) {
			// case: augment existing spiral
			if (size < rootOrSpiral.length) {
				throw new Error("Downsizing not implemented");
			}
			spiral = rootOrSpiral;
			coords = [spiral.length - 1, 0];
			i = spiral[coords[0]][coords[1]];
			max = size ** 2 + i - spiral.length ** 2;
		} else {
			// case: start new spiral from root value
			spiral = [[rootOrSpiral]];
			coords = [0, 0];
			i = rootOrSpiral;
			max = rootOrSpiral - 1 + size * size;
		}
		const rdlu = [true, false, false, false];	// right down left up; right/down=+, left/up=-
		while (i < max) {
			// increment the value to be put in
			i++;
			// define new coordinates
			coords[0] += rdlu[0] - rdlu[2];
			coords[1] += rdlu[1] - rdlu[3];
			// ensure arrays are defined
			if (coords[0] < 0) {
				// OOB under on X-axis
				spiral.unshift([]);
				coords[0] = 0;
			} else if (!spiral[coords[0]]) {
				// OOB over on X-axis
				spiral[coords[0]] = [];
			}
			if (coords[1] < 0) {
				// OOB under on Y-axis (no need to check for overflow here: array already defined)
				for (let it = 0; it < spiral.length; it++) {
					spiral[it].unshift(0);
				}
				coords[1] = 0;
			}
			// set the value
			spiral[coords[0]][coords[1]] = i;
			// check next step (turn or straight)
			if (!spiral[coords[0] - rdlu[1] + rdlu[3]][coords[1] + rdlu[0] - rdlu[2]]) {
				rdlu.unshift(rdlu.pop());
			}	
		}
		return spiral;
	},

	/*
	Implements PQa algorithm as per http://www.jpr2718.org/pell.pdf
	P0, Q0 and D are PQa's parameters
	stopper is a callback returning true when to stop; its argument is PQa's data structure, all keys referring to arrays:
	{A, B, G, a, P, Q}
	@returns Object {A, B, G, a, P, Q}
	*/
	PQa: function (P0, Q0, D, stopper) {
		// check validity
		if (Q0 === 0) {
			throw new Error('Q0 cannot be zero');
		}
		if (Number.isInteger(Math.sqrt(D))) {
			throw new Error('D cannot be a square');
		}
		if (P0 ** 2 !== D % Q0) { // remained == modulus for x > 0
			throw new Error('P0^2 must equal D mod Q0');
		}
		// init algorithm
		const sqrtOfD = Math.sqrt(D),
			data = {
			A: [],
			B: [],
			G: [],
			a: [],
			P: [P0],
			Q: [Q0]
		};
		data.A[-2] = 0;
		data.A[-1] = 1;
		data.B[-2] = 1;
		data.B[-1] = 0;
		data.G[-2] = -P0;
		data.G[-1] = Q0;
		// go
		let i = 0;
		do {
			var i1 = i - 1, i2 = i - 2;
			if (i > 0) {
				data.P[i] = data.a[i1] * data.Q[i1] - data.P[i1];
				data.Q[i] = (D - data.P[i] ** 2) / data.Q[i1];
			}
			data.a[i] = Math.floor((data.P[i] + sqrtOfD) / data.Q[i]);
			data.A[i] = data.a[i] * data.A[i1] + data.A[i2];
			data.B[i] = data.a[i] * data.B[i1] + data.B[i2];
			data.G[i] = data.a[i] * data.G[i1] + data.G[i2];
			i++;
		} while (!stopper(data));
		return data;
	},

	/*
	Implements Dijkstra's algorithm that computes a map of (shortest) paths in a tree
	Takes a tree as a String of Numbers: each level is a line, each sibling node separated by a space
	@returns Array<Object> with objects {
		coordinates: Array<Number>, 2D coordinates of the node in the tree
		visited: Boolean, obviously true everywhere at the end
		value: Number, the original node value
		distance: Number, the computed distance
		from: Object the reference to the parent that's in the shortest path
	 }
	*/
	dijkstra: function (rawTree) {
		// format tree and queue for Dijkstra
		const queue = [];
		const tree = rawTree.trim().split("\n").map((line, lineIndex) => {
			return line.split(' ').map((number, numberIndex) => {
				const o = {
					coordinates: [lineIndex, numberIndex],
					visited: false,
					value: parseInt(number, 10),
					distance: 0,
					from: null
				};
				queue.push(o);
				return o;
			});
		});
		tree[0][0].distance = tree[0][0].value;

		// logic to get the next node to process in queue
		// marks the returned as visited
		const popNextNode = function () {
			let selection = null,
				index = null;
			queue.forEach((node, queueIndex) => {
				if (!node.visited && (!selection || selection.distance < node.distance)) {
					selection = node;
					index = queueIndex;
				}
			});
			if (selection) {
				queue.splice(index, 1);
				selection.visited = true;
			}
			return selection;
		};

		// neighbors are next line's index & index+1
		const getNeighbors = function (node) {
			const nextLine = node.coordinates[0] + 1;
			if (nextLine >= tree.length) {
				return [];
			}
			const offset = node.coordinates[1];
			return [
				tree[nextLine][offset],
				tree[nextLine][offset + 1]
			];
		};

		// make Dijkstra map
		let node;
		while (node = popNextNode()) {
			getNeighbors(node).forEach((neighbor) => {
				var weight = node.distance + neighbor.value;
				if (neighbor.distance < weight) {
					neighbor.distance = weight;
					neighbor.from = node;
				}
			});
		}

		return tree;
	}
};