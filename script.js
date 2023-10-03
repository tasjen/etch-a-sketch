const reset = document.querySelector('#reset');
const black = document.querySelector('#black');
const random = document.querySelector('#random');
const eraser = document.querySelector('#eraser');
const selectSize = document.querySelector('#select-size');
const container = document.querySelector('#container');

let color = 'black';
let squareSize = 768;
let pixelSize = 16;
let isDrawing = false;
let isRandom = false;
let focusedButton = black;

window.addEventListener('mouseup', () => isDrawing = false);
reset.addEventListener('click', () => {
  const pixel = document.querySelectorAll('.pixel');
  pixel.forEach(e => e.style.backgroundColor = 'white');
  console.log('RESET');
});
black.addEventListener('click', () => {
  color = 'black';
  isRandom = false;
  focusButton(black);
  console.log('Color is changed to black');
});
random.addEventListener('click', () => {
  isRandom = true;
  focusButton(random);
  console.log('Random mode');
});
eraser.addEventListener('click', () => {
  color = 'white';
  isRandom = false;
  focusButton(eraser);
  console.log('Eraser mode');
});
selectSize.addEventListener('click', () => {
  let sizeBuffer = prompt('Select size of the square');
  while ((!Number.isInteger(+sizeBuffer) || +sizeBuffer <= 0) && sizeBuffer !== null) {
    alert('Invalid size');
    sizeBuffer = prompt('Select size of the square');
  }
  if (sizeBuffer !== null){
    pixelSize = +sizeBuffer;
    container.removeChild(container.firstElementChild);
    createSquare();
    console.log(`Size of the square is changed to ${pixelSize}x${pixelSize}`);
  }
});

function createPixel(){
  let pixel = document.createElement('div');
  pixel.style.height = (squareSize/pixelSize) + 'px';
  pixel.style.width = pixel.style.height;
  pixel.style.backgroundColor = 'white';
  pixel.className = 'pixel';
  pixel.addEventListener('mousedown', event => {
    event.preventDefault();
    isDrawing = true;
    pixel.style.backgroundColor = getCurrentColor();
  });
  pixel.addEventListener('contextmenu', event => event.preventDefault());
  pixel.addEventListener('mouseenter', () => {
    if (isDrawing) pixel.style.backgroundColor = getCurrentColor();
  });
  return pixel;
}

function createSquare(){
  const square = document.createElement('div');
  square.style.height = squareSize + 'px';
  square.style.width = square.style.height;
  square.id = 'square';
  for(let i = 0; i < pixelSize; i++){
    for(let j = 0; j < pixelSize; j++){
      square.appendChild(createPixel());
    }
  }
  container.appendChild(square);
}

function getRandomColor(){
  return "rgb(" + Math.floor(Math.random() * 256) + ","
                + Math.floor(Math.random() * 256) + ","
                + Math.floor(Math.random() * 256) + ")";
}

function getCurrentColor(){
  return isRandom ? getRandomColor() : color;
}

function focusButton(button){
  focusedButton.style.backgroundColor = reset.style.backgroundColor;
  focusedButton = button;
  button.style.backgroundColor = 'rgb(144, 144, 144)';
}


createSquare();
focusButton(black);