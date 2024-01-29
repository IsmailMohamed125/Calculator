function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}
let firstNumber;
let secondNumber;
let operator;

function operate(firstNumber, operator, secondNumber) {
  switch (operator) {
    case "+":
      return add(firstNumber, secondNumber);
    case "-":
      return subtract(firstNumber, secondNumber);
    case "*":
      return multiply(firstNumber, secondNumber);
    case "/":
      return divide(firstNumber, secondNumber);
  }
}

const currentCalc = document.querySelector(".current-calc");
const answer = document.querySelector(".answer");
const digits = document.querySelectorAll(".digits");
const operators = document.querySelectorAll(".operators");
const equal = document.querySelector(".btn-eql");
const clear = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");
let calcArray = [];
let isActionOne = true;
let currentValue;
let newAnswer;

digits.forEach((digit) =>
  digit.addEventListener("click", function () {
    decCheck();
    calcArray.push(`${digit.textContent}`);
    changeDisplay();
    console.log(calcArray);
  })
);

function changeDisplay() {
  if (calcArray.length === 0) {
    answer.textContent = 0;
  } else {
    answer.textContent = calcArray.join("");
  }
}

operators.forEach((op) => {
  op.addEventListener("click", function () {
    if (isActionOne) {
      currentValue = +answer.textContent;
      firstNumber = currentValue;
      operator = op.textContent;
      currentCalc.textContent = `${firstNumber} ${operator}`;
      answer.textContent = 0;
      calcArray = [];
      // dec.disabled = false;
      isActionOne = !isActionOne;
    } else {
      currentValue = +answer.textContent;
      secondNumber = currentValue;
      console.log(secondNumber, firstNumber, operator);
      newAnswer = operate(firstNumber, operator, secondNumber);
      console.log(newAnswer);
      firstNumber = newAnswer;
      operator = op.textContent;
      currentCalc.textContent = `${firstNumber} ${operator}`;
      answer.textContent = 0;
      calcArray = [];
      // dec.disabled = false;
    }
  });
});

equal.addEventListener("click", function () {
  if (
    firstNumber !== undefined &&
    operator !== undefined &&
    calcArray.length !== 0
  ) {
    secondNumber = +answer.textContent;
    answer.textContent = operate(firstNumber, operator, secondNumber);
    calcArray = [...answer.textContent];
    // console.log(calcArray);
    currentCalc.textContent = "";
    reset();
    // console.log(secondNumber, firstNumber);
    isActionOne = true;
  }
});

clear.addEventListener("click", function () {
  reset();
  calcArray = [];
  // dec.disabled = false;
  currentCalc.textContent = "";
  answer.textContent = 0;
  isActionOne = true;
});

deleteBtn.addEventListener("click", function () {
  if (calcArray.length > 0) {
    calcArray.pop();
    changeDisplay();
  }
});
