/* eslint-disable no-tabs */

import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminSvgo from 'imagemin-svgo';
import imageminWebp from 'imagemin-webp';

import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const settings = require('./settings.json');

const { project } = settings;
const inputPath = 'media/img-src/*.{jpg,svg}';
const outPath = 'media/images';

(async () => {
	const img = await imagemin([inputPath], {
		destination: outPath,
		plugins: [
			imageminMozjpeg({ quality: 70 }),
			imageminSvgo(),
			// imageminWebp({ quality: 85 }),
		],
	});

	img.forEach((e) => { console.log(e.destinationPath); });
	console.log('project:', project);
	console.log('Images optimized:', img.length);
})();
