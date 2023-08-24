import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return {
    days,
    hours,
    minutes,
    seconds
  };
}


function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

document.addEventListener("DOMContentLoaded", function () {
  const dateTimePicker = document.getElementById("datetime-picker");
  const startButton = document.querySelector("[data-start]");
  const daysValue = document.querySelector("[data-days]");
  const hoursValue = document.querySelector("[data-hours]");
  const minutesValue = document.querySelector("[data-minutes]");
  const secondsValue = document.querySelector("[data-seconds]");

  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];


      if (selectedDate > new Date()) {
        startButton.removeAttribute("disabled");
      } else {
        startButton.setAttribute("disabled", true);
        Notiflix.Notify.failure("Please choose a date in the future");
      }
    },
  };


  flatpickr(dateTimePicker, options);

  let countdownInterval;


  startButton.addEventListener("click", function () {
    const selectedDate = new Date(dateTimePicker.value).getTime();
    startButton.setAttribute("disabled", true);


    countdownInterval = setInterval(function () {
      const now = new Date().getTime();
      const timeLeft = selectedDate - now;

      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        daysValue.textContent = "00";
        hoursValue.textContent = "00";
        minutesValue.textContent = "00";
        secondsValue.textContent = "00";
        startButton.removeAttribute("disabled");
      } else {
        const time = convertMs(timeLeft);
        daysValue.textContent = addLeadingZero(time.days);
        hoursValue.textContent = addLeadingZero(time.hours);
        minutesValue.textContent = addLeadingZero(time.minutes);
        secondsValue.textContent = addLeadingZero(time.seconds);
      }
    }, 1000);
  });
});