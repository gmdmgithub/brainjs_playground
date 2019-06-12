//
const data = require('./data.json');

const brain = require('brain.js');

//recurrent network long-short-term-memory
const network = new brain.recurrent.LSTM();

const trainingData = data.map((item)=>({
    input: item.text,
    output: item.category
}));

console.log(trainingData);

network.train(trainingData,{iterations:100});

// const output = network.run('I fix the power supply');

const output = network.run('I program node.js');
console.log('output, category node?',output);