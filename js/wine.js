const brain = require("brain.js");
// data comes from https://archive.ics.uci.edu/ml/datasets/wine+quality
const wineData = require("../data/wine.json");

const trainingData = wineData.map(wine => ({// map and normalize
  input: {
    fixedAcidity:       wine.fixedAcidity / 10,
    volatileAcidity:    wine.volatileAcidity / 10,
    citricAcid:         wine.citricAcid / 10,
    residualSugar:      wine.residualSugar / 10,
    chlorides:          wine.chlorides / 10,
    freeSulfurDioxide:  wine.freeSulfurDioxide / 100,
    totalSulfurDioxide: wine.totalSulfurDioxide / 100,
    density:            wine.density / 10,
    ph:                 wine.pH / 10,
    sulphates:          wine.sulphates / 10,
    alcohol:            wine.alcohol / 10
  },
  output: {
    qual:               wine.quality / 10
  }
}));
let network = new brain.NeuralNetwork();

network.train(trainingData, {
    errorThresh: 0.0045,  // error threshold to reach before completion
    iterations: 300,     // maximum training iterations 
    log: true,           // console.log() progress periodically 
    logPeriod: 20,       // number of iterations between logging 
    learningRate: 0.3    // learning rate 
});

// lets check the quality of our new wine
const result = network.run({
  fixedAcidity: 0.74,
  volatileAcidity: 0.07,
  citricAcid: 0.03,
  residualSugar: 0.18,
  chlorides: 0.0056,
  freeSulfurDioxide: 0.13,
  totalSulfurDioxide: 0.29,
  density: 0.09988,
  ph: 0.31,
  sulphates: 0.052,
  alcohol: 1.2
});

console.log(Math.round(result.qual*100)/10);// scale up - de-normalize and rescale to have number with one digit after dot
