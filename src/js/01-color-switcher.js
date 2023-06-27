// Завдання 1 - перемикач кольорів
// Напиши скрипт, який після натискання кнопки «Start», раз на секунду змінює колір фону < body > на випадкове значення,
// використовуючи інлайн стиль.Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.
// Для генерування випадкового кольору використовуй функцію getRandomHexColor.

const COLORS_DELAY = 1000;
let intervalId = null;

const startBtnRef = document.querySelector('button[data-start]');
const stopBtnRef = document.querySelector('button[data-stop]');
const bodyRef = document.body;

startBtnRef.addEventListener('click', onStartBtnClick);
stopBtnRef.addEventListener('click', onStopBtnClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function onStartBtnClick() {
  startBtnRef.disabled = true;
  stopBtnRef.disabled = false;
  intervalId = setInterval(() => {
    bodyRef.style.backgroundColor = getRandomHexColor();
  }, COLORS_DELAY);
}

function onStopBtnClick() {
  startBtnRef.disabled = false;
  stopBtnRef.disabled = true;
  clearInterval(intervalId);
}
