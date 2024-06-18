const COMMON_WORDS = [
	'a',
	'is',
	'the',
	'are',
	'they',
	'their',
	'theirs',
	'them',
	'of',
	'i',
	'on',
	'this',
	'be',
	'in',
	'an',
	'that',
	'to',
];
const EXCLUDED_WORDS_MAP = new Map();

COMMON_WORDS.forEach((w) => EXCLUDED_WORDS_MAP.set(w, 1));

// TODO
// [] group similar words like...
// US, u.s.
// review, reviews
// builder, builders
// [] implement multigram, which should make use of the sliding window algo
// using that algo will be faster as it will run at O(n) instead of O(ngram * n)
// [] implement the volume per keyword and count those too

function getNGrams(values, n = 1) {
	// to implement
	const nGrams = new Map();
	values.forEach((val) => {
		const words = ('' + val).toLowerCase().split(' ');

		// words.forEach((word) => {
		// 	const frequency = nGrams.get('' + word) ?? 0;
		// 	// Logger.log({word, frequency})
		// 	if (!EXCLUDED_WORDS_MAP.get(word)) nGrams.set('' + word, frequency + 1);
		// });

		// using Sliding window for multigram
		// NOTE: I'll only limit it to 3-grams
		let left = 0,
			right = 0,
			currentWords = [];
		while (left < words.length) {
			const word = words[right];
			// first check the words[right]
			// also, check if the current word[right] is part of excluded
			const distance = right - left + 1;
			if (distance > 3 || !word) {
				currentWords = [];
				left++;
				right = left;
				continue;
			}
			right++;
			if (distance === 1 && EXCLUDED_WORDS_MAP.get(word)) continue;

			currentWords.push(word);
			const joinedWords = currentWords.join(' ');
			const frequency = nGrams.get(joinedWords) ?? 0;
			nGrams.set(joinedWords, frequency + 1);
			// then, move the right pointer, check those two words
			// move the right pointer again, check those three words
		}
	});
	// the minimum frequency should be 2.
	return Array.from(nGrams.entries());
}

function testGetNGrams() {
	Logger.log('testing...');
	const sheet = SpreadsheetApp.getActiveSheet();
	const values = sheet.getRange('A2:A20').getValues();

	Logger.log(values);
	Logger.log(getNGrams(values));
}
