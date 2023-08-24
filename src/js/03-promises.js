import Notiflix from "notiflix";

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({
          position,
          delay
        });
      } else {
        reject({
          position,
          delay
        });
      }
    }, delay);
  });
}

const form = document.querySelector(".form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let delay = parseInt(form.elements.delay.value);
  let step = parseInt(form.elements.step.value);
  let amount = parseInt(form.elements.amount.value);

  let position = 1;

  for (let i = 0; i < amount; i++) {
    createPromise(position, delay)
      .then(({
        position,
        delay
      }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({
        position,
        delay
      }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    position++;
    delay += step;
  }
});