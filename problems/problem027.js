const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 027     */
/***********************/
Euler discovered the remarkable quadratic formula:
n2+n+41
It turns out that the formula will produce 40 primes for the consecutive integer values 0≤n≤39. However, when n=40,402+40+41=40(40+1)+41 is divisible by 41, and certainly when n=41,412+41+41 is clearly divisible by 41.
The incredible formula n2−79n+1601 was discovered, which produces 80 primes for the consecutive values 0≤n≤79. The product of the coefficients, −79 and 1601, is −126479.
Considering quadratics of the form:
    n2+an+b, where |a|<1000 and |b|≤1000
where |n| is the modulus/absolute value of n
e.g. |11|=11 and |−4|=4
Find the product of the coefficients, a and b, for the quadratic expression that produces the maximum number of primes for consecutive values of n, starting with n=0.
`;

function job(max) {

	// build list of primes (b has to be prime since we start at n=0)
	// TODO: use more optimized functions from Utils
	const primes = [];
	for (let i = 1; i <= max; i++) {
		if (Utils.isPrime(i)) {
			primes.push(i);
		}
	}

	const record = {
		streak: 0,
		a: 0,
		b: 0,
		sign: 0
	};
	const increments = [-1, 1];	// sign variation
	for (let a = 1; a < max; a++) {
		for (let bi = 0; bi < primes.length; bi++) {
			let b = primes[bi];
			for (const increment of increments) {
				let n = 0,
					counter = 0;
				while (Utils.isPrime(n * n + a * n + b)) {
					n += increment;
					counter++;
				}
				if (counter > record.streak) {
					record.streak = counter;
					record.a = a;
					record.b = b;
					record.sign = increment;
				}
			}
		}
	}
	
	return record.a * record.b;

}

module.exports = {
	d: description,
	p: 1000,
	f: job
}