import playField from "./snake.js";

let canvas = document.getElementById("snakeCanvas");
let ctx = canvas.getContext("2d");

let game = new playField(canvas.width, canvas.height, 20, 4);
ctx.fillStyle = game.snake.color;

let moveAndDrawTimer = setInterval(() => {
    game.gameUpdate();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = game.snake.color;
    for(let i = 0; i < game.snake.positions.length - 1; i++) {
        let pos = game.getSnakePosition(i);
        ctx.fillRect(pos.posX, pos.posY, game.snake.snakeSize, game.snake.snakeSize);
    }
    for (let food of game.foodPositions) {
        ctx.drawImage(new Ima)
    }
    if(!game.snake.alive) {
        clearInterval(moveAndDrawTimer);
        document.getElementById("gameOverText").style.display = "block";
    }
}, 500);

document.addEventListener('keyup', (e) => {
   if(e.code === "ArrowRight") game.snake.changeDirection("right");
   else if(e.code === "ArrowLeft") game.snake.changeDirection("left");
   else if(e.code === "ArrowUp") game.snake.changeDirection("up");
   else if(e.code === "ArrowDown") game.snake.changeDirection("down");
});



