const brain = require("brain.js");

const rawData = require("./stock.json");

const min = rawData.reduce((m, data) => {
    return data.low < m ? data.low : m
}, 100000000) //to normalize

console.log(min);

const scaleDown = (step) => { //down is normalizing data
    return {
        open: step.open / min,
        high: step.high / min,
        low: step.low / min,
        close: step.close / min
    };
};

console.log(scaleDown(rawData[0]));

const scaleUp = (step) => { //up is de-normalizing
    return {
        open: step.open * min,
        high: step.high * min,
        low: step.low * min,
        close: step.close * min
    };
}

console.log(scaleUp(scaleDown(rawData[0])));

const scaledData = rawData.map(scaleDown);

// console.log(scaledData);
const trainingData = [
    scaledData.slice(0, 5),
    scaledData.slice(5, 10),
    scaledData.slice(10, 15),
    scaledData.slice(15, 20),
];

//console.log(trainingData);

const network = new brain.recurrent.LSTMTimeStep({
    inputSize: 4,
    hiddenLayers: [8, 8],
    outputSize: 4
})

network.train(trainingData, {
    learningRate: 0.005,
    errorThresh: 0.02,
    // log: (stats) => console.log(stats)
});

console.log(scaleUp( network.run( trainingData[0])));

console.log(network.forecast( 
    [
        trainingData[0][0],
        trainingData[0][1],
    ],3
    ).map(scaleUp)
    );
