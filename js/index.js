let inputDir = { x: 0, y: 0 };
let lastPaintTime = 0;
const board = document.getElementById("board");
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 16, y: 12 };
let speed = 5;
let score = 0;
const scoreDOM = document.getElementById("score");
const difficulty = document.getElementById("difficulty");
difficulty.addEventListener("click",(e)=>{
   
    if(e.target.value==="easy"){
        speed=6;
    }else if(e.target.value==="medium")speed=9;
    else speed = 14;
})



// Initialize sound

// Game Function

function isCollide(sarr) {
  // If snake eats itself
  for (let i = 1; i < sarr.length; i++) {
    if (sarr[i].x === sarr[0].x && sarr[0].y === sarr[i].y) return true;
  }

  // if snake collides with the wall
  if((sarr[0].x>18 || sarr[0].y >18)||(sarr[0].x<=0 || sarr[0].y <=0) )return true;
  return false;
}
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function gameEngine() {
  // Part1 : Updating the snake array & Food

  if (isCollide(snakeArr)) {
    inputDir = { x: 0, y: 0 };
    alert(`Game Over , Your score is ${score}`);
    snakeArr = [{ x: 13, y: 15 }];
    score = 0;
  }

  


  // If snake has eaten the food , increment score and regenerate the food
  if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
    score++;
    scoreDOM.innerHTML = "Score  " + score ;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    food.x = Math.floor(2 + Math.random() * 14);
    food.y = Math.floor(2 + Math.random() * 14);
  }
  // movement of snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x = snakeArr[0].x + inputDir.x;
  snakeArr[0].y = snakeArr[0].y + inputDir.y;

  // Part2 : Dispaly the snake and Food
  //Dispaly the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  //Dispaly the snake
  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// Main Logic
window.requestAnimationFrame(main);

window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 };
  document.getElementById("welcome").classList.add("none")
  switch (e.key) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;
      
      break;
    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
  
      break;
    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
     
      break;
    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;
    
      break;
    default:
  
      break;
  }
});
