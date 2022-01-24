import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// const input = document.querySelector('#datetime-picker')

const startBtn = document.querySelector('button')
const refs = {
    sec: document.querySelector('[data-seconds]'),
    min: document.querySelector('[data-minutes]'),
    hours:document.querySelector('[data-hours]'),
    days:document.querySelector('[data-days]')
}
        
    
startBtn.setAttribute("disabled", true)

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        const balanceMs = selectedDates[0] - options.defaultDate
        if (balanceMs <= 0) {
         window.alert("Please choose a date in the future")
        } else {
            startBtn.removeAttribute("disabled");
            
      }    
  },
};

flatpickr("#datetime-picker", options)
startBtn.addEventListener('click', updateTimer())

function updateTimer() {
    setInterval(() => {
        const balanceDate = convertMs(balanceMs)
       
    }, 1000)
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}