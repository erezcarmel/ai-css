import * as tf from '@tensorflow/tfjs';

const data = [
	{ time: 9, screenWidth: 1200, theme: 0 },   // light (0)
	{ time: 21, screenWidth: 800, theme: 1 },   // dark (1)
	{ time: 14, screenWidth: 1400, theme: 0 },  // light (0)
	{ time: 2, screenWidth: 900, theme: 1 }     // dark (1)
];

const xs = tf.tensor2d(data.map(item => [item.time, item.screenWidth]));
const ys = tf.tensor2d(data.map(item => [item.theme]));

const utils = tf.sequential();
utils.add(tf.layers.dense({ inputShape: [2], units: 8, activation: 'relu' }));
utils.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

utils.compile({ optimizer: 'adam', loss: 'binaryCrossentropy' });

await utils.fit(xs, ys, { epochs: 50 });

export const predictTheme = async (time, screenWidth) => {
	const prediction = utils.predict(tf.tensor2d([[time, screenWidth]]));
	return (await prediction.data())[0] > 0.5 ? 'dark' : 'light';
};