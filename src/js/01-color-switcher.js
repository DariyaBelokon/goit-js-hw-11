const refs = {
      startBtn: document.querySelector('[data-start]'),
      stopBtn: document.querySelector('[data-stop]'),
      body: document.querySelector('body'),
  }



const backgroundColor = () => {
    refs.body.style.backgroundColor=getRandomHexColor();
    console.log(refs.body);

}
const bodyChangeColor = (e) => {
    refs.startBtn.setAttribute('disabled', true);
    const newInterval = setInterval(backgroundColor, 1000);
          const stopBodyChangeColor = () => {
          refs.startBtn.removeAttribute('disabled');
          clearInterval(newInterval);
}
    refs.stopBtn.addEventListener('click', stopBodyChangeColor);
}


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}



refs.startBtn.addEventListener('click', bodyChangeColor);


