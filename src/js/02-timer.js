import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

let selectedDate = null;
let intervalId = null;
let currentDate = null;

const refs = {
    btnStartTimer: document.querySelector('button[data-start]'),
    daysRemaining: document.querySelector('[data-days]'),
    hoursRemaining: document.querySelector('[data-hours]'),
    minutesRemaining: document.querySelector('[data-minutes]'),
    secondsRemaining: document.querySelector('[data-seconds]'),
    dateInput: document.querySelector('input#datetime-picker'),
};

        
refs.btnStartTimer.disabled = true;
refs.btnStartTimer.addEventListener("click", timerStart);

let remainingTime = 0;
    
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        onDateCheck(selectedDates)
    },
};
 
flatpickr(refs.dateInput, options);

function onDateCheck(selectedDates) {
    selectedDate = selectedDates[0].getTime();
    currentDate = new Date().getTime();
        
    if (selectedDate > currentDate) {
        refs.btnStartTimer.disabled = false;
        return;
    } else {
        window.alert("Please choose a date in future");
    }
}

function timerStart() {
    setInterval(() => {
        currentDate = new Date().getTime();
        if (selectedDate - currentDate <= 1000) {
            clearInterval(intervalId);
            refs.btnStartTimer.disabled = true;
            refs.dateInput.disabled = false;
            return;

        } else {
            refs.btnStartTimer.disabled = true;
            refs.dateInput.disabled = true;
            currentDate += 1000;
            remainingTime = Math.floor(selectedDate - currentDate);
            convertMs(remainingTime);
        }
    }, 1000);

}

   


function createMarkup({ days, hours, minutes, seconds }) {
    refs.daysRemaining.textContent = days;
    refs.hoursRemaining.textContent = hours;
    refs.minutesRemaining.textContent = minutes;
    refs.secondsRemaining.textContent = seconds;
}

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

