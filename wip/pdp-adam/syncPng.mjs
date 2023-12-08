/* eslint-disable no-tabs */

import imagemin from 'imagemin';
// import imageminOptipng from 'imagemin-optipng';
import imageminPngquant from 'imagemin-pngquant';
import imageminWebp from 'imagemin-webp';

import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const settings = require('./settings.json');

const { project } = settings;
const inputPath = 'media/img-src/*.png';
const outPath = 'media/images';
(async () => {
	const png = await imagemin([inputPath], {
		destination: outPath,
		plugins: [
			// imageminOptipng({
			// 	optimizationLevel: 3,
			// }),
			imageminPngquant({
				quality: [0.8, 0.9],
			}),
		],
	});
	const webp = await imagemin([inputPath], {
		destination: outPath,
		plugins: [
			imageminWebp({ quality: 95 }),
		],
	});

	png.forEach((e) => { console.log(e.destinationPath); });
	webp.forEach((e) => { console.log(e.destinationPath); });
	console.log('project:', project);
	console.log('png optimized:', png.length);
	console.log('webp optimized:', webp.length);
})();
