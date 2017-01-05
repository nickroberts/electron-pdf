const fs = require('fs');
const rimraf = require('rimraf');
const gm = require('gm');
const imagemagick = require('imagemagick-native');
const Promise = require('bluebird');
const filesDir = `${__dirname}/../files`;
const tmpDirName = `.tmp`;
const tmpDir = `${__dirname}/../${tmpDirName}`;

// TODO: use app.getPath('temp') for the files, as this won't work on a built app.

class ConvertPDF {

	constructor() {
		console.log('ConvertPDF loaded.');
		// Create / clean temp dir
		if (fs.existsSync(tmpDir)) {
			rimraf.sync(`${tmpDir}`);
		}
		fs.mkdirSync(tmpDir);
	}

	// Test converting single page PDF
	doItSingle() {
		return new Promise( (resolve, reject) => {
			// gm (graphicsmagick) implementation
			// gm(`${filesDir}/Test.pdf`)
			// 	.write(`${tmpDir}/Test.jpg`, (err) => {
			// 		if (err) {
			// 			console.error(err);
			// 			reject(err);
			// 			return;
			// 		}
			// 		console.log(`${tmpDirName}/Test.pdf created.`);
			// 		resolve(true);
			// 	});

			// imagemagick-native implementation
			fs.writeFile(`${tmpDir}/Test.jpg`, imagemagick.convert({
				srcData: fs.readFileSync(`${filesDir}/Test.pdf`),
				format: 'JPG',
				quality: 100
			}), (err) => {
				if (err) {
					console.error(err);
					reject(err);
					return;
				}
				console.log(`${tmpDirName}/Test.pdf created.`);
				resolve(true);
			});
		});
	}

	// Test converting multiple page PDF
	doItMultiple() {
		return new Promise( (resolve, reject) => {
			// gm (graphicsmagick) implementation
			gm().command('convert').in('+adjoin').in(`${filesDir}/Test2.pdf`).write(`${tmpDir}/Test_%02d.jpg`, (err) => {
				if (err) {
					console.error(err);
					reject(err);
					return;
				}
				console.log(`Multiple images created from ${tmpDirName}/Test2.pdf.`);
				resolve(true);
			});

			// imagemagick-native implementation
			// The imagemagick-native module will not handle multi-page PDFs :(
			// fs.writeFile(`${tmpDir}/Test_%02d.jpg`, imagemagick.convert({
			// 	srcData: fs.readFileSync(`${filesDir}/Test2.pdf`),
			// 	format: 'JPG',
			// 	quality: 100
			// }), (err) => {
			// 	if (err) {
			// 		console.error(err);
			// 		reject(err);
			// 		return;
			// 	}
			// 	console.log(`Multiple images created from ${tmpDirName}/Test2.pdf.`);
			// 	resolve(true);
			// });
		});
	}

}

module.exports = new ConvertPDF();
