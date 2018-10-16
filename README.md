# Euler
#### Fun with Project Euler on NodeJS.
Based on [Project Euler's challenges](https://projecteuler.net/archives).

Unverified solutions.

## Usage
- `node . -p 42` to run `problems/problem042.js`
- `node . --all` to run all implemented problems

## Structure
- [`index.js`](https://github.com/xetoile/euler/blob/master/index.js) loads problems and interprets the CLI command
- [`problems/utils.js`](https://github.com/xetoile/euler/blob/master/problems/utils.js) declares all utility functions
- [`problems/problem*.js`](https://github.com/xetoile/euler/tree/master/problems) holds each problem's algorithm

## Implement a problem
Has to be named `/^problem[0-9]{3}\.js$/`.

General structure:
```es6
const Utils = require('./utils'); // optional
const description = `...`;
module.exports = {
	d: description,
	p: ['param1', 'param2'], // optional
	f: /*async */function (param1, param2) { ... return someSolution; }
}
```

## Output
#### single problem run
```
description

>>> solution <<<

Computed in 123ms with params=[param1,param2]
```
#### all problems run
```
[...123ms] [problem001] >>> solution1 <<< ([p1,p2])
[....45ms] [problem002] >>> solution2 <<< ([param])
...
```
