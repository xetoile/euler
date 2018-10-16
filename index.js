'use strict'

const Minimist = require('minimist');

class Euler {

	/*
	Loads all implemented problems, lamely ensuring all problems are readable
	*/
	loader() {
		const Path = require('path'),
			fs = require('fs'),
			classpath = Path.join(__dirname, 'problems');

		let problems = {};
		const executor = function (resolve, reject) {
			fs.readdir(classpath, (err, files) => {
				if (err) {
					reject(new Error('Could not read class directory'));
				}
				files.map((f) => {
					if (!f.match(/^problem[0-9]+\.js$/)) {
						return;
					}
					const name = f.substr(0, f.lastIndexOf('.'))
					problems[name] = require(Path.join(classpath, name));
					if (!problems[name].f) {
						console.log(`${name} not defined`);
					}
				});
				resolve(problems);
			});
		}
		return new Promise(executor);
	}

	/*
	Helper for run and runAll
	*/
	minifyParams(p) {
		const s = JSON.stringify(p); // also serves as memory in case business logic alters referenced params
		if (s.length > 30) {
			return s.substr(0, 27) + '...';
		}
		return s;
	};

	/*
	Runner for a single problem
	*/
	async run(module) {
		const params = this.minifyParams(module.p);
		console.log(module.d);
		const t0 = Date.now(),
			result = await module.f.apply(module, Array.isArray(module.p) ? module.p : [module.p]),
			t1 = Date.now();
		console.log(`>>> ${result} <<<`);
		console.log();
		console.log(`Computed in ${t1 - t0}ms with params=${params}.`);
	};

	/*
	Runs all known problems
	*/
	async runAll(problems) {
		for (const p in problems) {
			const m = problems[p],
				t0 = Date.now(),
				r = await m.f.apply(m, Array.isArray(m.p) ? m.p : [m.p]),
				t1 = Date.now(),
				formattedTime = `${t1 - t0}`.padStart(6, '.');
			console.log(`[${formattedTime}ms] [${p}] >>> ${r} <<< (${this.minifyParams(m.p)})`);
		}
	};

	/*
	Entry point
	*/
	async start() {
		const args = Minimist(process.argv, {string: 'p'}),
			problems = await this.loader();
		if (args.all) {
			this.runAll(problems);
		} else if (args.p) {
			const problem = `problem${args.p.padStart(3, '0')}`;
			if (!problems[problem]) {
				return console.log(`Problem ${args.p} not implemented`);
			}
			this.run(problems[problem]);
		} else {
			console.log(`
	Usage:
		--all	runs all implemented problems (currently ${Object.keys(problems).length})
		-p N	runs a specific problem, with N its number
	`);
		}
	}
}

const euler = new Euler();
euler.start()