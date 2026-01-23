"use strict";

// DOM要素の取得
const elTimer = document.querySelector("#timer");
const btnStart = document.querySelector("#start");
const btnStop = document.querySelector("#stop");
const btnReset = document.querySelector("#reset");

// 状態管理用の変数
let beginTime;
let timerID;
let elapsedTime = 0;
let audioActive = false;
let audioObj = null;

// 初期状態に設定
initButtons();

////////////////////////
// スタートボタン
////////////////////////
btnStart.addEventListener("click", () => {
  if (audioActive) playSound("end", "");
  playSound("start", "sound/start.mp3");

  switchButtonState("running");
  beginTime = Date.now();
  runTimer();
});

////////////////////////
// ストップボタン
////////////////////////
btnStop.addEventListener("click", () => {
  if (audioObj && !audioObj.paused) {
    audioObj.pause();
    audioObj.currentTime = 0;
  }

  if (audioActive) playSound("end", "");

  if (elTimer.textContent.slice(0, 5) === "00:10") {
    audioObj = new Audio("sound/stop2_long.mp3");
    audioObj.play();

    // 背景設定
    const body = document.body;
    body.style.backgroundImage = "url('img/fireworks.gif')";
    body.style.backgroundColor = "rgba(0, 0, 0, 0)";
  } else {
    audioObj = new Audio("sound/stop1_long.mp3");
    audioObj.play();
  }

  elapsedTime += Date.now() - beginTime;
  clearTimeout(timerID);
  switchButtonState("stopped");
});

////////////////////////
// リセットボタン
////////////////////////
btnReset.addEventListener("click", () => {
  if (audioActive) playSound("end", "");
  playSound("start", "sound/reset.mp3");

  elTimer.textContent = "00:00.000";
  elapsedTime = 0;
  switchButtonState("initial");

  const body = document.body;
  body.style.backgroundImage = "";
  body.style.backgroundColor = "rgba(233, 168, 227, 0.6)";
});

////////////////////////
// タイマー動作関数
////////////////////////
function runTimer() {
  const timeDiff = Date.now() - beginTime + elapsedTime;
  const d = new Date(timeDiff);
  const min = String(d.getMinutes()).padStart(2, "0");
  const sec = String(d.getSeconds()).padStart(2, "0");
  const ms = String(d.getMilliseconds()).padStart(3, "0");
  elTimer.textContent = `${min}:${sec}.${ms}`;

  timerID = setTimeout(runTimer, 10);
}

////////////////////////
// ボタン状態の切り替え
////////////////////////
function switchButtonState(state) {
  const hiddenClass = "timer-fontColor_hidden";
  const appearClass = "timer_appear";

  if (state === "initial") {
    btnStart.classList.remove("js-inactive", "js-unclickable");
    btnStop.classList.add("js-inactive", "js-unclickable");
    btnReset.classList.add("js-inactive", "js-unclickable");
    elTimer.classList.remove(hiddenClass, appearClass);
  }

  if (state === "running") {
    elTimer.classList.add(hiddenClass);
    btnStart.classList.add("js-inactive", "js-unclickable");
    btnStop.classList.remove("js-inactive", "js-unclickable");
    btnReset.classList.add("js-inactive", "js-unclickable");
  }

  if (state === "stopped") {
    elTimer.classList.remove(hiddenClass);
    elTimer.classList.add(appearClass);
    btnStart.classList.add("js-inactive", "js-unclickable");
    btnStop.classList.add("js-inactive", "js-unclickable");
    btnReset.classList.remove("js-inactive", "js-unclickable");
  }
}

function initButtons() {
  switchButtonState("initial");
}

////////////////////////
// サウンド制御
////////////////////////
let musicObj;
function playSound(status, file) {
  if (status === "start") {
    musicObj = new Audio(file);
    musicObj.currentTime = 0;
    musicObj.play();
    audioActive = true;
  } else if (status === "end" && musicObj) {
    musicObj.pause();
    musicObj.currentTime = 0;
    audioActive = false;
  }
}
