import CalculatorManager from "./class/CalculatorManager.js";

const options = [
  ["÷", (a, b) => a / b],
  ["×", (a, b) => a * b],
  ["-", (a, b) => a - b],
  ["+", (a, b) => a + b],
];

const calculator = new CalculatorManager(options);

calculator.init();
