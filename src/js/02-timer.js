// Завдання 2 - таймер зворотного відліку
// Напиши скрипт таймера, який здійснює зворотний відлік до певної дати.
// Використовуй бібліотеку flatpickr для того, щоб дозволити користувачеві кросбраузерно вибрати
// кінцеву дату і час в одному елементі інтерфейсу.Для того щоб підключити CSS код бібліотеки в проект,
// необхідно додати ще один імпорт, крім того, що описаний в документації.

//Adding libraries imports
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const TIMER_DELAY = 1000;
let intervalId = null;
let selectedDate;

const startBtnRef = document.querySelector('button[data-start]');
const daysRef = document.querySelector('span[data-days]');
const hoursRef = document.querySelector('span[data-hours]');
const minutesRef = document.querySelector('span[data-minutes]');
const secondsRef = document.querySelector('span[data-seconds]');

startBtnRef.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    selectedDate = selectedDates[0];

    if (selectedDate.getTime() < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    Notiflix.Notify.success(
      'Awesome! Press «Start» button to activate countdown'
    );
    startBtnRef.disabled = false;
  },
};

flatpickr('input#datetime-picker', options);

startBtnRef.addEventListener('click', activateTimer);

function activateTimer() {
  intervalId = setInterval(() => {
    startBtnRef.disabled = true;
    const deltaDate = selectedDate.getTime() - Date.now();

    if (deltaDate <= 0) {
      clearInterval(intervalId);
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(deltaDate);
    daysRef.textContent = days;
    hoursRef.textContent = hours;
    minutesRef.textContent = minutes;
    secondsRef.textContent = seconds;
  }, TIMER_DELAY);
}

// Calculating time remaining until the userDate

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
//  Add 0 in if the number has less than two characters
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
