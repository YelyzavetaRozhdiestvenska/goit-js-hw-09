import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

let selectedDate = null;
let intervalId = null;
let currentDate = null;

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    myInput: document.querySelector('input#datetime-picker'),
    daysRemaining: document.querySelector('[data-days]'),
    hoursRemaining: document.querySelector('[data-hours]'),
    minutesRemaining: document.querySelector('[data-minutes]'),
    secondsRemaining: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;

refs.startBtn.addEventListener("click", timerStart);
    
let remainingTime = 0;    

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
//   console.log(selectedDates[0]);
      dataCheck(selectedDates);
    },
};

flatpickr(refs.myInput, options);

function dataCheck(selectedDates) {
    selectedDate = selectedDates[0].getTime();
    currentDate = new Date().getTime();

    if (selectedDate < currentDate) {
        refs.startBtn.disabled = false;
        return;
    
    }
    window.alert("Please choose a date in the future");
};

function timerStart() {
    intervalId = setInterval(() => {
        
        currentDate = new Date().getTime();
        if ((selectedDate - currentDate) <= 1000) {
            clearInterval(intervalId);  
            refs.startBtn.disabled = true;
            refs.myInput.disabled = false;
            return;
        } else {
            refs.startBtn.disabled = true;
            refs.myInput.disabled = true;
            currentDate += 1000;
            remainingTime = Math.floor(selectedDate - currentDate);
            convertMs(remainingTime);
        }

    }, 1000);
    
};

function createMarkup({ days, hours, minutes, seconds }) {
refs.daysRemaining.textContent = days;
refs.hoursRemaining.textContent = hours;
refs.minutesRemaining.textContent = minutes;
refs.secondsRemaining.textContent = seconds;
};

function addLeadingZero(value) {
 return String(value).padStart(2, '0');
};

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
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
    
  createMarkup({ days, hours, minutes, seconds });
  return { days, hours, minutes, seconds };
}