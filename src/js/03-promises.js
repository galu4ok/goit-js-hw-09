// Завдання 3 - генератор промісів
// Напиши скрипт, який на момент сабміту форми викликає функцію createPromise(position, delay) стільки разів,
// скільки ввели в поле amount.Під час кожного виклику передай їй номер промісу(position), що створюється,
// і затримку, враховуючи першу затримку(delay), введену користувачем, і крок(step).

import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');
formRef.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormSubmit(evt) {
  evt.preventDefault();
  const { delay, step, amount } = evt.currentTarget.elements;

  let delayRef = Number(delay.value);
  const stepRef = Number(step.value);
  const amountRef = Number(amount.value);

  for (let i = 1; i <= amountRef; i += 1) {
    createPromise(i, delayRef)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    delayRef += stepRef;
  }
  evt.currentTarget.reset();
}
