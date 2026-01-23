'use strict';

// ワークエリア
let isFirstInput = "1";     // 初回フラグ
let totalValue = 0;         // 合計
let currentInput = "";      // 現在の入力値
let currentOperator = "+";  // 現在の演算子
let lastInputType = "1";    // 前の入力: 0=数値, 1=演算子

// DOM 要素の取得
const logDisplay = document.getElementById("logDisplay");
const finalResult = document.getElementById("finalResult");

const btn0 = document.getElementById("btn0");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");
const btn5 = document.getElementById("btn5");
const btn6 = document.getElementById("btn6");
const btn7 = document.getElementById("btn7");
const btn8 = document.getElementById("btn8");
const btn9 = document.getElementById("btn9");

const btnPlus = document.getElementById("btnPlus");
const btnMinus = document.getElementById("btnMinus");
const btnMultiply = document.getElementById("btnMultiply");
const btnDivide = document.getElementById("btnDivide");

const btnEqual = document.getElementById("btnEqual");
const btnClear = document.getElementById("btnClear");

// 数字ボタンのイベント登録
btn0.addEventListener("click", () => handleNumber("0"));
btn1.addEventListener("click", () => handleNumber("1"));
btn2.addEventListener("click", () => handleNumber("2"));
btn3.addEventListener("click", () => handleNumber("3"));
btn4.addEventListener("click", () => handleNumber("4"));
btn5.addEventListener("click", () => handleNumber("5"));
btn6.addEventListener("click", () => handleNumber("6"));
btn7.addEventListener("click", () => handleNumber("7"));
btn8.addEventListener("click", () => handleNumber("8"));
btn9.addEventListener("click", () => handleNumber("9"));

// 演算子ボタンのイベント登録
btnPlus.addEventListener("click", () => handleOperator("+"));
btnMinus.addEventListener("click", () => handleOperator("-"));
btnMultiply.addEventListener("click", () => handleOperator("*"));
btnDivide.addEventListener("click", () => handleOperator("/"));

// = と C ボタン
btnEqual.addEventListener("click", showResult);
btnClear.addEventListener("click", resetCalc);

/** 数字入力処理 */
function handleNumber(input) {
  if (lastInputType === "0") {
    finalResult.innerHTML = Number(finalResult.innerHTML + input); // 連結（ゼロサプレス）
  } else {
    finalResult.innerHTML = input;
  }
  isFirstInput = "0";
  lastInputType = "0";
}

/** 演算子入力処理 */
function handleOperator(op) {
  if (lastInputType === "0") {
    logDisplay.innerHTML += Number(finalResult.innerHTML) + op;
    runCalculation();
  } else {
    if (isFirstInput === "1") {
      logDisplay.innerHTML = "0" + op;
    } else {
      const lastChar = logDisplay.innerHTML.slice(-1);
      if (["+", "-", "*", "/"].includes(lastChar)) {
        logDisplay.innerHTML = logDisplay.innerHTML.slice(0, -1) + op;
      } else {
        logDisplay.innerHTML += op;
      }
    }
  }
  currentOperator = op;
  lastInputType = "1";
}

/** = が押されたときの処理 */
function showResult() {
  if (isFirstInput === "0" && lastInputType === "0") {
    logDisplay.innerHTML += Number(finalResult.innerHTML);
    runCalculation();
    currentOperator = "=";
    lastInputType = "1";
  }
}

/** クリアボタンの処理 */
function resetCalc() {
  finalResult.innerHTML = "0";
  logDisplay.innerHTML = "";
  isFirstInput = "1";
  totalValue = 0;
  currentOperator = "+";
  lastInputType = "1";
}

/** 計算ロジック */
function runCalculation() {
  const currentValue = Number(finalResult.innerHTML);

  switch (currentOperator) {
    case "+":
      totalValue += currentValue;
      break;
    case "-":
      totalValue -= currentValue;
      break;
    case "*":
      totalValue *= currentValue;
      break;
    case "/":
      totalValue /= currentValue;
      break;
  }

  finalResult.innerHTML = totalValue;
}
