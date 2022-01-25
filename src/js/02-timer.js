import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const startBtn = document.querySelector('button')
const input = document.querySelector('#datetime-picker')

        
startBtn.setAttribute("disabled", true)

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
    minuteIncrement: 1,
  
    onClose(selectedDates) {
        const balanceMs = selectedDates[0] - options.defaultDate
     if (balanceMs <= 0) {
  
         Notify.warning("Please choose a date in the future");
        } else {
         startBtn.removeAttribute("disabled");
         const initialTime = selectedDates[0];
         
         startBtn.addEventListener('click', () => { 
             const timer = new Timer();
             timer.start(initialTime)
         });
        } 
    }    
};

flatpickr("#datetime-picker", options)

class Timer {
    constructor() {
        this.intervalId = null;
        this.refs = {
    sec: document.querySelector('[data-seconds]'),
    min: document.querySelector('[data-minutes]'),
    hours:document.querySelector('[data-hours]'),
    days:document.querySelector('[data-days]')
    }
}

    start(time) {
        startBtn.setAttribute("disabled", true)
        this.intervalId = setInterval(() => {
            const deltaTime = time - new Date()
            const timerTime = convertMs(deltaTime)
            this.addLeadingZero(timerTime)
        }, 1000)
    }

addLeadingZero({ days, hours, minutes, seconds }) {
    this.refs.sec.textContent = String(seconds).padStart(2,'0');
    this.refs.min.textContent = String(minutes).padStart(2,'0');
    this.refs.hours.textContent = String(hours).padStart(2,'0');
    this.refs.days.textContent = String(days).padStart(2,'0');
 
    }

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


