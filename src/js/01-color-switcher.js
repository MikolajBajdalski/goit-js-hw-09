const startButton = document.querySelector('[data-start]')
const stopButton = document.querySelector('[data-stop]')
const body = document.querySelector('body')

let intervalId;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const start = () => {
  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor()
  }, 1000)
  startButton.setAttribute("disabled", true)
  stopButton.removeAttribute("disabled", false);
}



function stop() {
  clearInterval(intervalId)
  startButton.removeAttribute("disabled", false);
  stopButton.setAttribute("disabled", true);
}

startButton.addEventListener('click', start)
stopButton.addEventListener('click', stop)