const brain = require("brain.js");


const trainingData = [
    { input: 'I am super happy!', output: 'happy' },
    { input: 'I am extremely happy!', output: 'happy' },
    { input: 'What a pill!', output: 'sarcastic' },
    { input: 'I am super unhappy!', output: 'sad' },
    { input: 'Are we there yet?', output: 'excited' }
];

// LSTM - Long Short Time Memory
// {hiddenLayers: [3,3]}
const net = new brain.recurrent.LSTM();
// net.train(trainingData, {
//     iterations: 100,
//     errorThresh: 0.006,
//     // log: (stats) => console.log(stats)
// });

net.train(trainingData, {
        iterations: 10000,
        errorThresh: 0.001,
});

console.log(net.run('I am happy!'));
// console.log(net.run('I am unhappy!'));
