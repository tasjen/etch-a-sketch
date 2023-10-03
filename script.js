const body = document.querySelector('body');
const reset = document.querySelector('#reset');
const black = document.querySelector('#black');
const random = document.querySelector('#random');
const selectSize = document.querySelector('#select-size');
const container = document.querySelector('#container');

let color = 'black';
let size = 16;
let isDrawing = false;
let isRandom = false;

body.addEventListener('mouseup', (event) => {
  if (event.target.className != 'pixel') isDrawing = false;
});

reset.addEventListener('click', () => {
  const pixel = document.querySelectorAll('.pixel');
  pixel.forEach(e => e.style.backgroundColor = 'white');
  console.log('RESET');
});
black.addEventListener('click', () => {
  color = 'black';
  console.log('Color is changed to black');
});
random.addEventListener('click', () => {
  isRandom = true;
});
selectSize.addEventListener('click', () => {
  let sizeBuffer = prompt('Select size of the square');
  while ((!Number.isInteger(+sizeBuffer) || +sizeBuffer <= 0) && sizeBuffer !== null) {
    alert('Invalid size');
    sizeBuffer = prompt('Select size of the square');
  }
  if (sizeBuffer !== null){
    size = sizeBuffer;
    console.log(`Size of the square is changed to ${size}x${size}`);
    container.removeChild(container.firstElementChild);
    createSquare();
  }
});

function createPixel(){
  let pixel = document.createElement('div');
  pixel.style.height = (512/size) + 'px';
  pixel.style.width = (512/size) + 'px';
  pixel.style.backgroundColor = 'white';
  pixel.className = 'pixel';
  pixel.addEventListener('mousedown', event => {
    event.preventDefault();
    isDrawing = true;
    if (isRandom) color = getRandomColor();
    pixel.style.backgroundColor = color;
  });
  pixel.addEventListener('contextmenu', event => event.preventDefault());
  pixel.addEventListener('mouseup', () => isDrawing = false);
  pixel.addEventListener('mouseenter', () => {
    if (isDrawing) {
      if (isRandom) color = getRandomColor();
      pixel.style.backgroundColor = color;
    }
  });
  return pixel;
}

function createSquare(){
  const square = document.createElement('div');
  square.id = 'square';
  for(let i = 0; i < size; i++){
    for(let j = 0; j < size; j++){
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

createSquare();