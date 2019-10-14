import Game from "./Snake/Game.js";
import Tile from "./Snake/Tile.js";
import Snake from "./Snake/snake.js";

let canvas = document.getElementById("snakeCanvas");
let ctx = canvas.getContext("2d");

let tileSize = 20;
let rows = Math.floor(canvas.width / tileSize);
let cols = Math.floor(canvas.height / tileSize);
let game = new Game(rows, cols, 5);
ctx.fillStyle = "#FF0000";

ctx.clearRect(0, 0, canvas.width, canvas.height);

let updateTimer = setInterval(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    if(game.running) {
        //draw snake
        for(let i = 0; i < game.snake.tiles.length - 1; i++) {
            let gameTile = game.snake.tiles[i];
            console.log("drawing snake tile at ", gameTile.tileX, ", ", gameTile.tileY);
            ctx.fillRect((gameTile.tileX - 1 ) * tileSize, (gameTile.tileY - 1) * tileSize, tileSize, tileSize);
        }

        //draw Food
        for(let food of game.foods) {
            console.log("drawing food at ", food.position.tileX, ", ", food.position.tileY);
            ctx.drawImage(food.image, (food.position.tileX - 1) * tileSize, (food.position.tileY - 1) * tileSize, tileSize, tileSize);
        }
    }
    else {
        clearInterval(updateTimer);
        document.getElementById("gameOverText").style.display = "block";
    }
}, 500);

document.addEventListener('keyup', (e) => {
    if(e.code === "ArrowRight" && game.snake.direction !== Snake.snakeDirections.LEFT) {
        game.snake.direction = Snake.snakeDirections.RIGHT;
        game.snake.velocity = 1 ;
    }
    else if(e.code === "ArrowLeft" && game.snake.direction !== Snake.snakeDirections.RIGHT) {
        game.snake.direction = Snake.snakeDirections.LEFT;
        game.snake.velocity = -1;
    }
    else if(e.code === "ArrowUp" && game.snake.direction !== Snake.snakeDirections.DOWN) {
        game.snake.direction = Snake.snakeDirections.UP;
        game.snake.velocity = -1;
    }
    else if(e.code === "ArrowDown" && game.snake.direction !== Snake.snakeDirections.UP) {
        game.snake.direction = Snake.snakeDirections.DOWN;
        game.snake.velocity = 1;
    }
});