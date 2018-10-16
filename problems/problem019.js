const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 019     */
/***********************/
You are given the following information, but you may prefer to do some research for yourself.
    - 1 Jan 1900 was a Monday.
    - Thirty days has September,
      April, June and November.
      All the rest have thirty-one,
      Saving February alone,
      Which has twenty-eight, rain or shine.
      And on leap years, twenty-nine.
    - A leap year occurs on any year evenly divisible by 4, but not on a century unless it is divisible by 400.
How many Sundays fell on the first of the month during the twentieth century (1 Jan 1901 to 31 Dec 2000)?
`;

function job(target, rangeStart, rangeEnd) {

	const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

	// 1-indexed param
	const countDays = function (monthIndex, year) {
		if (monthIndex === 2) {
			if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
				return 29;
			}
			return 28;
		} else if ([4, 6, 9, 11].includes(monthIndex)) {
			return 30
		} else {
			return 31;
		}
	}

	// 6 for sunday
	const targetRemainder = weekdays.indexOf(target);

	// start counting from what we know: 1900-1-1 => monday, so sundays => (1900-1-1 + <day count>) % 7 === 6
	let dayCount = 0,
		targetCount = 0;
	for (let y = 1900; y <= rangeEnd[0]; y++) {
		// we'll count for the next month (+1 in if, < and not <= in last month)
		for (let m = 1; m <= 12 || m < rangeEnd[1] && y === rangeEnd[0]; m++) {
			dayCount += countDays(m, y);
			if ((dayCount + 1) % 7 === targetRemainder) {
				targetCount++;
			}
		}
	}

	return targetCount;

}

module.exports = {
	d: description,
	p: ['sunday', [1901, 1, 1], [2000, 12, 31]],
	f: job
}