const Utils = require('./utils');
const description = `
/***********************/
/*     PROBLEM 059     */
/***********************/
Each character on a computer is assigned a unique code and the preferred standard is ASCII (American Standard Code for Information Interchange). For example, uppercase A = 65, asterisk (*) = 42, and lowercase k = 107.
A modern encryption method is to take a text file, convert the bytes to ASCII, then XOR each byte with a given value, taken from a secret key. The advantage with the XOR function is that using the same encryption key on the cipher text, restores the plain text; for example, 65 XOR 42 = 107, then 107 XOR 42 = 65.
For unbreakable encryption, the key is the same length as the plain text message, and the key is made up of random bytes. The user would keep the encrypted message and the encryption key in different locations, and without both "halves", it is impossible to decrypt the message.
Unfortunately, this method is impractical for most users, so the modified method is to use a password as a key. If the password is shorter than the message, which is likely, the key is repeated cyclically throughout the message. The balance for this method is using a sufficiently long password key for security, but short enough to be memorable.
Your task has been made easy, as the encryption key consists of three lower case characters. Using cipher.txt (right click and 'Save Link/Target As...'), a file containing the encrypted ASCII codes, and the knowledge that the plain text must contain common English words, decrypt the message and find the sum of the ASCII values in the original text.
`;

function job(cipherFile, wordsFile, set, size) {

	const cipher = JSON.parse(`[${Utils.asset(cipherFile)}]`),
		words = JSON.parse(`[${Utils.asset(wordsFile)}]`),
		passwords = Utils.combineAll(set, size);
	for (const password of passwords) {
		const pCode = password.split('').map((c) => {
			return c.charCodeAt(0);
		});
		const textCodes = [],
			textChars = [];
		for (let it = 0; it < cipher.length; it++) {
			const code = cipher[it] ^ pCode[it % pCode.length];
			textChars.push(String.fromCharCode(code));
			textCodes.push(code);
		}
		const textWords = textChars.join('').split(' ');
		const matches = textWords.reduce((acc, cur) => {
			return acc + words.includes(cur.toUpperCase());
		}, 0);
		if (matches / textWords.length > 1/2) {
			return textCodes.reduce((acc, cur) => {
				return acc + cur;
			}, 0);
		}
	}


}

module.exports = {
	d: description,
	p: ['p059_cipher.txt', 'p042_words.txt', 'abcdefghijklmnopqrstuvwxyz', 3],
	f: job
}