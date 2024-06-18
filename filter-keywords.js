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
// [] implement the volume per keyword and count those too

function getNGrams(values, volumes = 0, n = 3, minFrequency = 3) {
	if (values.length !== volumes.length)
		return 'ERROR: argument 1 (values) and argument 2(volumes) should have equal length';
	const nGrams = new Map();
	values.forEach((val, i) => {
		const words = ('' + val).toLowerCase().split(' ');

		// using Sliding window
		let left = 0,
			right = 0,
			currentWords = [];
		while (left < words.length) {
			const word = words[right];
			const distance = right - left + 1;
			if (distance > n || !word) {
				currentWords = [];
				left++;
				right = left;
				continue;
			}
			right++;
			if (distance === 1 && EXCLUDED_WORDS_MAP.get(word)) continue;

			currentWords.push(word);
			const joinedWords = currentWords.join(' ');
			const frequency = (nGrams.get(joinedWords)?.at(0) ?? 0) + 1;
			const volume =
				Number(nGrams.get(joinedWords)?.at(1) ?? 0) + Number(volumes[i]);
			nGrams.set(joinedWords, [frequency, volume]);
		}
	});

	return Array.from(nGrams.entries())
		.filter(([ngram, val]) => {
			Logger.log(ngram, val);
			return val[0] > minFrequency;
		})
		.map(([ngram, val]) => {
			return [ngram, val[0], val[1]];
		});
}

function testGetNGrams() {
	Logger.log('testing...');
	const sheet = SpreadsheetApp.getActiveSheet();
	const range1 = sheet.getRange('A2:A20').getValues();
	const range2 = sheet.getRange('C2:C20').getValues();

	Logger.log(getNGrams(range1, range2));
}
