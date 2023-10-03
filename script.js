const body = document.querySelector('body');
const reset = document.querySelector('#reset');
const black = document.querySelector('#black');
const random = document.querySelector('#random');
const selectSize = document.querySelector('#select-size');
const container = document.querySelector('#container');

let color = 'black';
let size = 16;
let draw = false;

body.addEventListener('mouseup', (event) => {
  if (event.target.className != 'pixel') draw = false;
});

reset.addEventListener('click', () => console.log('RESET'));
black.addEventListener('click', () => {
  color = 'black';
  console.log('Color is changed to black');
});
random.addEventListener('click', () => {
  console.log('Color is changed to random');
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
    draw = true;
    pixel.style.backgroundColor = color;
  });
  pixel.addEventListener('contextmenu', event => event.preventDefault());
  pixel.addEventListener('mouseup', () => draw = false);
  pixel.addEventListener('mouseenter', () => {
    if (draw) pixel.style.backgroundColor = color;
  })
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



createSquare();