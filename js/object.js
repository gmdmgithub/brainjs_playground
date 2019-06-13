//input data
// 0 is a default value when it does not exits in the object
const colors = [
    { green: 0.2, blue: 0.4 },
    { green: 0.4, blue: 0.6 },
    { red: 0.2, green: 0.8, blue: 0.8 },
    { green: 1, blue: 1 },
    { red: 0.8, green: 1, blue: 1 },
    { red: 1, green: 1, blue: 1 },
    { red: 1, green: 0.8, blue: 0.8 },
    { red: 1, green: 0.6, blue: 0.6 },
    { red: 1, green: 0.4, blue: 0.4 },
    { red: 1, green: 0.31, blue: 0.31 },
    { red: 0.8 },
    { red: 0.6, green: 0.2, blue: 0.2 }
];

const brightnesses = [
    { dark: 0.8 },
    { neutral: 0.8 },
    { light: 0.7 },
    { light: 0.8 },
    { light: 0.9 },
    { light: 1 },
    { light: 0.8 },
    { neutral: 0.7, light: 0.5 },
    { dark: 0.5, neutral: 0.5 },
    { dark: 0.6, neutral: 0.3 },
    { dark: 0.85 },
    { dark: 0.9 }
];

let trainingDataO = [];

colors.forEach((color,index) =>{
    trainingDataO.push({
      input:color,
      output: brightnesses[index]
  })  
})

const network = new brain.NeuralNetwork({hiddenLayer: [3,2]});


const tData = network.train(trainingDataO)
// lets see how it trains
console.log(tData);

//finally prediction

const tRes = network.run({
    light: 0.4
})

console.log(tRes);


// inverting problem

trainingDataO = [];

brightnesses.forEach((bright,index) =>{
    trainingDataO.push({
      input:bright,
      output: colors[index]
  })  
})

const invertedNetwork = new brain.NeuralNetwork({hiddenLayer: [3,2]});


const invertedData = invertedNetwork.train(trainingDataO)
// lets see how it trains
console.log(invertedData);

//finally prediction

const invertedRes = invertedNetwork.run({
    dark: 0.7
})

console.log(invertedRes);
