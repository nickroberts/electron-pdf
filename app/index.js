const convert = require('./app/convert');

convert.doItSingle()
	.then((response) => console.log('Done single.', response))
	.catch((reason) => console.error('Error single.', reason));

convert.doItMultiple()
	.then((response) => console.log('Done multiple.', response))
	.catch((reason) => console.error('Error multiple.', reason));
