const startBtn = document.querySelector('[data-start]')
const stopBtn = document.querySelector('[data-stop]')
const body = document.querySelector('body')
let timerID = null
stopBtn.setAttribute("disabled", true)


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener('click', changeBcgColor)

function changeBcgColor() {
    startBtn.setAttribute("disabled", true)
    stopBtn.removeAttribute("disabled")
    timerID = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000)
    
}

stopBtn.addEventListener('click', stopChangeBcgColor)

function stopChangeBcgColor() {
    clearInterval(timerID)
    startBtn.removeAttribute("disabled")
    stopBtn.setAttribute("disabled", true)
}

