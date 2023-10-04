const reset = document.querySelector('#reset');
const black = document.querySelector('#black');
const random = document.querySelector('#random');
const eraser = document.querySelector('#eraser');
const selectSize = document.querySelector('#select-size');
const container = document.querySelector('#container');
const sizeDisplay = document.querySelector('#size-display');

let color = 'black';
let squareSize = 768;
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
  let gridSize = prompt('Select size of the square');
  while ((!Number.isInteger(+gridSize) || +gridSize <= 0 || +gridSize > 80) && gridSize !== null) {
    if (+gridSize > 80) alert('the maximum size is 80');
    else alert('Invalid size');
    gridSize = prompt('Select size of the square');
  }
  if (gridSize !== null){
    gridSize = +gridSize;
    container.removeChild(container.firstElementChild);
    createSquare(gridSize);
    console.log(`Size of the square is changed to ${gridSize}x${gridSize}`);
  }
});

function createSquare(gridSize){
  const square = document.createElement('div');
  square.style.height = squareSize + 'px';
  square.style.width = square.style.height;
  square.id = 'square';
  for(let i = 0; i < gridSize; i++){
    for(let j = 0; j < gridSize; j++){
      square.appendChild(createPixel(gridSize));
    }
  }
  container.appendChild(square);
  sizeDisplay.textContent = `${gridSize}x${gridSize}`;
}

function createPixel(gridSize){
  let pixel = document.createElement('div');
  pixel.style.height = (squareSize/gridSize) + 'px';
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


createSquare(16);
focusButton(black);