function getNGrams(values, n = 1) {
	const nGrams = new Map();
	values.forEach((val) => {
		const words = ('' + val).split(' ');

		words.forEach((word) => {
			const frequency = nGrams.get('' + word) ?? 0;
			// Logger.log({word, frequency})
			nGrams.set('' + word, frequency + 1);
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
