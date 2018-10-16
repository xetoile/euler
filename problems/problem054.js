const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 054     */
/***********************/
In the card game poker, a hand consists of five cards and are ranked, from lowest to highest, in the following way:
    High Card: Highest value card.
    One Pair: Two cards of the same value.
    Two Pairs: Two different pairs.
    Three of a Kind: Three cards of the same value.
    Straight: All cards are consecutive values.
    Flush: All cards of the same suit.
    Full House: Three of a kind and a pair.
    Four of a Kind: Four cards of the same value.
    Straight Flush: All cards are consecutive values of same suit.
    Royal Flush: Ten, Jack, Queen, King, Ace, in same suit.
The cards are valued in the order:
2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King, Ace.
If two players have the same ranked hands then the rank made up of the highest value wins; for example, a pair of eights beats a pair of fives (see example 1 below). But if two ranks tie, for example, both players have a pair of queens, then highest cards in each hand are compared (see example 4 below); if the highest cards tie then the next highest cards are compared, and so on.
Consider the following five hands dealt to two players:
Hand	 	Player 1	 	Player 2	 		Winner
1	 	5H 5C 6S 7S KD 		2C 3S 8S 8D TD 		Player 2
		Pair of Fives 		Pair of Eights	 	
2	 	5D 8C 9S JS AC 		2C 5C 7D 8S QH		Player 1
		Highest card Ace 	Highest card Queen
3	 	2D 9C AS AH AC 		3D 6D 7D TD QD 		Player 2
		Three Aces 			Flush with Diamonds
4	 	4D 6S 9H QH QC 		3D 6D 7H QD QS 		Player 1
		Pair of Queens 		Pair of Queens
		Highest card Nine 	Highest card Seven
5	 	2H 2D 4C 4D 4S 		3C 3D 3S 9S 9D 		Player 1
		Full House 			Full House
		With Three Fours 	with Three Threes
The file, poker.txt, contains one-thousand random hands dealt to two players. Each line of the file contains ten cards (separated by a single space): the first five are Player 1's cards and the last five are Player 2's cards. You can assume that all hands are valid (no invalid characters or repeated cards), each player hand is in no specific order, and in each hand there is a clear winner.
How many hands does Player 1 win?
`;

function job(file) {

	let p1wins = 0;
	const order = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
	const suits = ['C', 'S', 'D', 'H'];
	const ranks = [
		'high card',
		'one pair',
		'two pairs',
		'three of a kind',
		'straight',
		'flush',
		'full house',
		'four of a kind',
		'straight flush',
		'royal flush'
	];
	// pass it a parsed (partial) hand `h` (see `parseHand`), returns the matching combination or false
	const tests = {
		// returns all (remaining) cards, sorted
		'high card': function (h) {
			const out = [];
			for (const o of order.slice().reverse()) {
				if (h.o[o] > 0) {
					out.push(o);
				}
			}
			return out;
		},
		// returns the first pair it finds, plus 'high card' logic
		'one pair': function (h) {
			const out = [];
			let has = false;
			for (const o of order) {
				if (h.o[o] === 2) {
					out.unshift(o);
					has = true;
				} else if (h.o[o] > 0) {
					out.push(o);
				}
			}
			if (has) {
				return [out[0]].concat(this['high card'](parseHand(out.slice(1))));
			}
			return false;
		},
		// returns 2 pairs first, then the last card
		'two pairs': function (h) {
			const out = [];
			for (const o of order) {
				if (h.o[o] === 2) {
					out.unshift(o);
				} else if (h.o[o] === 1) {
					out.push(o);
				}
			}
			if (out.length === 3) {
				return out;
			}
			return false;
			
		},
		// returns 3 same cards, then the rest (i.e. could match a full house)
		'three of a kind': function (h) {
			const out = [];
			let has = false;
			for (var o of order) {
				if (h.o[o] === 3) {
					has = true;
					out.unshift(o);
				} else if (h.o[o] > 0) {
					out.push(o);
				}
			}
			if (has) {
				// TODO: why concat? This one seems to work in standalone
				return [out[0]].concat(this['high card'](parseHand(out.slice(1))));
			}
			return false;
		},
		// returns the high card of the straight
		'straight': function (h) {
			for (let i = 0; i < order.length - 4; i++) {
				if (h.o[order[i]] > 0) {
					for (let j = i + 1; j < i + 5; j++) {
						if (h.o[order[j]] === 0) {
							return false;
						}
					}
					return order[i + 4];
				}
			}
			return false; // never happens
		},
		// returns 'high card' logic if same color everywhere
		'flush': function (h) {
			const sameColor = Object.keys(h.s).reduce((acc, cur) => {
				return acc || h.s[cur] === 5;
			}, false);
			if (!sameColor) {
				return false;
			}
			return this['high card'](h)[0];
		},
		// returns 'three of a kind' logic then 'one pair' logic
		'full house': function (h) {
			const r3 = this['three of a kind'](h);
			const r2 = this['one pair'](h);
			if (r2 && r3) {
				return [r3[0], r2[0]];
			}
			return false;
		},
		// returns the card present 4 times, then the last card
		'four of a kind': function (h) {
			const out = [];
			let has = false;
			for (const o of order) {
				if (h.o[o] === 4) {
					out.unshift(o);
					has = true;
				} else if (h.o[o] === 1) {
					out.push(o);
				}
			}
			if (has) {
				return out;
			}
			return false;
		},
		// checks 'flush' logic then returns 'straight' logic
		'straight flush': function (h) {
			if (!this['flush'](h)) {
				return false;
			}
			return this['straight'](h);
		},
		// returns true if 'straight flush' logic + card value OK
		'royal flush': function (h) {
			return this['straight flush'](h) === order[order.length - 1];
		}
	};

	// provides {o: {[card value]: Number}, s: {[card color]: Number}}
	const parseHand = function (cards) {
		const parsed = {
			o: {},
			s: {}
		};
		order.forEach((o) => {
			parsed.o[o] = 0;
		});
		suits.forEach((s) => {
			parsed.s[s] = [];
		})
		cards.forEach((c) => {
			parsed.o[c[0]]++;
			parsed.s[c[1]]++;
		});
		return parsed;
	};

	Utils.asset(file).trim().split("\n").forEach((line) => {
		const lineCards = line.split(' '),
			rawH1 = lineCards.slice(0, 5),
			rawH2 = lineCards.slice(5),
			h1 = parseHand(rawH1),
			h2 = parseHand(rawH2);
		for (const r of ranks.slice().reverse()) {
			const r1 = tests[r](h1),
				r2 = tests[r](h2);
			if (r1 && !r2) {
				p1wins++;
				return;
			} else if (!r1 && r2) {
				return;
			} else if (r1 && r2) {
				if (!Array.isArray(r1)) {
					r1 = [r1];
					r2 = [r2];
				}
				for (var i = 0; i < r1.length; i++) {
					if (order.indexOf(r1[i]) > order.indexOf(r2[i])) {
						p1wins++;
						return;
					}
				}
				// here we're still at perfect ex-aequo, next loop iteration might tell more
			}
		}
	});

	return p1wins;

}

module.exports = {
	d: description,
	p: 'p054_poker.txt',
	f: job
}