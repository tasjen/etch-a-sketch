const reset = document.querySelector('#reset');
const black = document.querySelector('#black');
const random = document.querySelector('#random');
const selectSize = document.querySelector('#select-size');

const square = document.querySelector('#square');

let color = 'black';
let size = 16;

reset.addEventListener('click', () => console.log('RESET'));
black.addEventListener('click', () => {
  color = 'black';
  console.log('Color is changed to black');
});
random.addEventListener('click', () => {
  color = 'random';
  console.log('Color is changed to random');
});
selectSize.addEventListener('click', () => {
  size = +prompt('Select size of the square');
  console.log(`Size of the square is changed to ${size}x${size}`);
});

function createPixel(){
  let pixel = document.createElement('div');
  pixel.style.height = (512/size) + 'px';
  pixel.style.width = (512/size) + 'px';
  pixel.style.backgroundColor = 'white';
  return pixel;
}

for(let i = 0; i < size; i++){
  for(let j = 0; j < size; j++){
    square.appendChild(createPixel());
  }
}
