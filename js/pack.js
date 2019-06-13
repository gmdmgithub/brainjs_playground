const net = new brain.NeuralNetwork({hiddenLayer: [3,2]})

const trainingData = [
  { input: [0, 0, 1], output: [0] },
  { input: [0, 0, 0], output: [0] },
  { input: [1, 0, 0], output: [0] },
  { input: [0, 1, 1], output: [1] },
  { input: [1, 0, 1], output: [1] },
  { input: [1, 1, 1], output: [1] },
  { input: [1, 1, 0], output: [1] },
  { input: [1, 0, 1], output: [0] }
];

net.train(trainingData, {
    log:            (error) => console.log(error),
    iterations:     1000
});

console.log(net.run([0,1,0]));
