"use strict";

/* ===============================
   Global state
================================ */
let currentIndex = -1;   // 現在の結果
let previousIndex = -1;  // 前回の結果

/* ===============================
   DOMContentLoaded
================================ */
window.addEventListener("DOMContentLoaded", () => {

  // header animation
  $("header").textillate({
    loop: false,
    minDisplayTime: 2000,
    initialDelay: 2000,
    autoStart: true,
    in: {
      effect: "fadeInLeftBig",
      delayScale: 1.5,
      delay: 50,
      sync: false,
      shuffle: true
    }
  });

  // scroll reveal
  ScrollReveal().reveal("#btn1", { duration: 9000 });

}, false);

/* ===============================
   DOM elements
================================ */
const drawButton = document.getElementById("btn1");
const omikujiArea = document.getElementById("omikujiText");
const omikujiText = document.getElementById("omikujiContent");
const omikujiImage = document.getElementById("omikujiTextImage");

/* ===============================
   Omikuji data
================================ */
const RESULTS = {
  text: ["大吉!!!!!", "中吉!!!", "小吉!!", "末吉!", "凶", "大凶"],
  color: ["#ff0000", "#c71585", "#ff7600", "#ff69b4", "#1e90ff", "#1e1fff"],
  fontSize: ["50px", "48px", "45px", "40px", "38px", "35px"],
  textImage: [
    "img/tanjiro1.png",
    "img/tanjiro2.png",
    "img/tanjiro3.png",
    "img/tanjiro4.png",
    "img/tanjiro5.png",
    "img/tanjiro6.png"
  ],
  snow: {
    maxSpeed: [5, 5, 1, 1, 1, 5],
    maxSize: [30, 30, 40, 60, 35, 20],
    minSize: [1, 1, 20, 50, 25, 1],
    image: [
      "img/star.png",
      "img/sakura_hanabira.png",
      "img/butterfly1.png",
      "img/candy1.png",
      "img/water2.png",
      "img/snowflakes.png"
    ]
  },
  sound: [
    "sound/kimetsu_sound1.mp3",
    "sound/kimetsu_sound2.mp3",
    "sound/kimetsu_sound3.mp3",
    "sound/kimetsu_sound4.mp3",
    "sound/kimetsu_sound5.mp3",
    "sound/kimetsu_sound6.mp3"
  ]
};

/* ===============================
   Click event
================================ */
drawButton.addEventListener("click", () => {

  // same result prevention
  while (currentIndex === previousIndex) {
    currentIndex = Math.floor(Math.random() * RESULTS.text.length);
  }
  previousIndex = currentIndex;

  // show text area
  omikujiArea.classList.remove("notDisplay");

  // text display
  omikujiText.textContent = RESULTS.text[currentIndex];
  omikujiText.style.color = RESULTS.color[currentIndex];
  omikujiText.style.fontSize = RESULTS.fontSize[currentIndex];

  // image animation
  omikujiImage.src = RESULTS.textImage[currentIndex];
  omikujiImage.classList.add("omikujiPaper");

  omikujiImage.addEventListener(
    "animationend",
    () => omikujiImage.classList.remove("omikujiPaper"),
    { once: true }
  );

  // snowfall
  $(document).snowfall("clear");
  $(document).snowfall({
    maxSpeed: RESULTS.snow.maxSpeed[currentIndex],
    minSpeed: 1,
    maxSize: RESULTS.snow.maxSize[currentIndex],
    minSize: RESULTS.snow.minSize[currentIndex],
    image: RESULTS.snow.image[currentIndex]
  });

  // sound
  const audio = new Audio(RESULTS.sound[currentIndex]);
  audio.currentTime = 0;
  audio.play();

}, false);
