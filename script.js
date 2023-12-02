let canvas = $("#gameCanvas");
let ctx = canvas.getContext("2d");

let size = 20;
let snake;
let frame = 0;
let frameInterval = 10;
let foodLocation = null;

let score = 0;
let highScore = 0;

let spriteImage = new Image();
spriteImage.src = "./snake-graphics.png";

window.addEventListener("load", function () {
  canvas.width = 600;
  canvas.height = 500;

  snake = new Snake({
    x: 10,
    y: 10,
    size: size,
  });

  let savedHighScore = localStorage.getItem('snake-high-score');
  highScore = savedHighScore || 0;

  generateFoodLocation();
  setScore()
  animate();
});

window.addEventListener("keydown", function (evt) {
  const keyCode = evt.key.toLocaleLowerCase();

  if (keyCode == "arrowright" && snake.speedX == 0) {
    snake.setDirection(1, 0);
  } else if (keyCode === "arrowleft" && snake.speedX == 0) {
    snake.setDirection(-1, 0);
  } else if (keyCode == "arrowdown" && snake.speedY == 0) {
    snake.setDirection(0, 1);
  } else if (keyCode == "arrowup" && snake.speedY == 0) {
    snake.setDirection(0, -1);
  }
});

function animate() {
  if (frame % frameInterval == 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (snake.eat(foodLocation)) {
      generateFoodLocation();
      snake.grow();
      score++;
    }

    snake.update();
    snake.draw(ctx);

    drawFood();
    setScore();
  }

  if (snake.endGame()) {
    gameOver();
    return;
  }
  requestAnimationFrame(animate);
  frame++;
}

function drawFood() {
  let sx = 0;
  let sy = 3;
  let pixelSize = 64;
  
  ctx.drawImage(
    spriteImage,
    sx * pixelSize,
    sy * pixelSize,
    pixelSize,
    pixelSize,
    foodLocation.x,
    foodLocation.y,
    size,
    size
  );
}

function generateFoodLocation() {
  foodLocation = {
    x: randomInt(size + 5, canvas.width - size),
    y: randomInt(size + 5, canvas.height - size),
  };
}

function setScore() {
  $('#score').innerHTML = `Score : ${score}`;
  $('#highScore').innerHTML = `High Score : ${highScore}`;
}

function gameOver() {
  let newHighScore = Math.max(score, highScore);
  highScore = newHighScore;;
  localStorage.setItem('snake-high-score', highScore);

  $('.gameover-container').classList.remove('hidden');
  $('h3').innerHTML = `You got ${score} point`
}

function reset() {
  $('.gameover-container').classList.add('hidden');
  
  snake.reset();
  score = 0;
  
  setScore();
  animate();
}

function handleCollisions(current, target) {
  return (
    current.x + size >= target.x &&
    current.x <= target.x + size &&
    current.y + size >= target.y &&
    current.y <= target.y + size
  );
}
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function $(selector) {
  return document.querySelector(selector);
}
