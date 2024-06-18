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

		words.forEach((word) => {
			const frequency = nGrams.get('' + word) ?? 0;
			// Logger.log({word, frequency})
			if (!EXCLUDED_WORDS_MAP.get(word)) nGrams.set('' + word, frequency + 1);
		});
	});
	return Array.from(nGrams.entries());
}

function testGetNGrams() {
	Logger.log('testing...');
	const sheet = SpreadsheetApp.getActiveSheet();
	const values = sheet.getRange('A2:A20').getValues();

	Logger.log(values);
	Logger.log(getNGrams(values));
}
