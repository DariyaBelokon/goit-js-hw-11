import Swal from 'sweetalert2';
// 1.ССылки
const refs = {
    inputDate: document.querySelector('#date-selector'),
    startBtn: document.querySelector('[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
}
refs.startBtn.setAttribute('disabled', true);

// 2. Добавление функционала на input

refs.inputDate.addEventListener('input', onInputChange);
refs.startBtn.classList.add('timer-btn');
function onInputChange(e) {
    if (e.target.value.trim === "") {
        return;
    } else {
        const eventDate = new Date(this.value).getTime();

        if (eventDate < Date.now()) {
          Swal.fire({
          title: 'Error!',
          text: 'Please choose a date in the future',
          icon: 'error',
          confirmButtonText: 'Cool'
           })
            return
        } else {
            refs.startBtn.removeAttribute('disabled');
        }  
    }
}

// 3. Класс Timer

class Timer {
    constructor({ onTick}) {
        this.intervalId = null;
        this.isActive = false;
        this.onTick = onTick;
        this.init();
    }

    init() {
        const time = convertMs(0);
        this.onTick(time);
    }

    start() {
        if (this.isActive) {
      return;
    }
        const startTime = new Date(refs.inputDate.value).getTime();
        const msInThreeHours = 10800000;
        this.isActive = true;
        refs.inputDate.disabled = true;

        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = startTime - currentTime - msInThreeHours;

            const time = convertMs(deltaTime);
            this.onTick(time);
            if (deltaTime === 0) {
                this.stop();
            }
        }, 1000);
    }
    stop() {
        clearInterval(this.intervalId);
        this.isActive = false;
        this.onTick(time);
        this.init();
  }
}


 const timer = new Timer({
 onTick: updateClockFace, 
});

refs.startBtn.addEventListener('click', timer.start.bind(timer));



 function pad(value) {
    return String(value).padStart(2, '0');
  }




function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function updateClockFace ({ days, hours, minutes, seconds }) {
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.minutes.textContent = `${minutes}`;
    refs.seconds.textContent = `${seconds}`;
}
