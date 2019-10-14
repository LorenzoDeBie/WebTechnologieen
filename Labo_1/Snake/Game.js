import Tile from "./Tile.js";
import Snake from "./snake.js";
import Food from "./Food.js";

export default class Game {

    rows; cols;
    tiles;
    snake;
    running;
    score;
    foods;
    name;

    constructor(rows, cols, nFoods) {
        //start game
        this.running = true;
        this.score = 0;
        //game dimensions
        this.rows = rows + 2;
        this.cols = cols + 2;
        //create the playing field
        this.tiles = [];
        for(let row = 0; row < rows + 2; row++) {
            let tempRow = [];
            for(let col = 0; col < cols + 2; col++) {
                //fake wall around the arena
                if(col === 0 || row === 0 || row === rows+1 || col === cols+1) {
                    tempRow.push(new Tile(row, col, Tile.tileStatus.WALL));
                }
                else {
                    tempRow.push(new Tile(row, col, Tile.tileStatus.EMPTY))
                }
            }
            this.tiles.push(tempRow);
        }

        //create the snake
        let snakeStartTile;
        do {
            snakeStartTile = this.getRandomTileW75P();
        } while(snakeStartTile.status !== Tile.tileStatus.EMPTY)
        this.snake = new Snake(snakeStartTile);
        snakeStartTile.status = Tile.tileStatus.SNAKE;
        //create food

        this.foods = [];
        for(let i = 0; i < nFoods; i++) {
            this.foods.push(this.createFood());
        }

        if(typeof(Storage) !== "undefined") {
            let prevHiscore = localStorage.getItem("highScore");
            if(prevHiscore !== undefined) {
                document.getElementById("highscore").innerHTML.concat(prevHiscore);
            }
            this.name = prompt("Uw Naam:");
        }
    }

    update() {
        let newSnakePos;
        let currentPos = this.snake.getCurrentPos();
        //update snake

        if(this.snake.direction === Snake.snakeDirections.RIGHT || this.snake.direction === Snake.snakeDirections.LEFT) {
            newSnakePos = this.tiles[currentPos.tileX + this.snake.velocity][currentPos.tileY];
        }
        else {
            newSnakePos = this.tiles[currentPos.tileX][currentPos.tileY + this.snake.velocity];
        }
        //snake = dead
        if(newSnakePos.status === Tile.tileStatus.WALL || newSnakePos.status === Tile.tileStatus.SNAKE) {
            this.snake.alive = false;
            this.running = false;
            if(typeof(Storage) !== "undefined") {
                let newRow = document.createElement('tr');
                let date = document.createElement('td');
                let today = new Date();
                date.innerText = String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear();
                newRow.appendChild(date);
                let name = document.createElement('td');
                name.innerText = this.name;
                newRow.appendChild(name);
                let score = document.createElement('td');
                score.innerText = this.score;
                newRow.appendChild(score);
                document.getElementById("highscore").appendChild(newRow)
                window.localStorage.setItem("highScore", document.getElementById("highscore").innerHTML);
            }
            alert("Game Over!");
        }
        //snake found food
        else if(newSnakePos.status === Tile.tileStatus.FOOD) {
            //increase Score
            this.score++;
            //increase snake size
            this.snake.grow(newSnakePos);
            //find which food object is eaten
            for(let i = 0; i < this.foods.length; i++) {
                if(this.foods[i].position === newSnakePos) {
                    //create new food
                    let newFood = this.createFood();
                    //replace old food
                    this.foods.splice(i, 1, newFood);
                    //change new food tile status
                    this.tiles[newFood.position.tileX][newFood.position.tileY].status = Tile.tileStatus.FOOD;
                    //change new tile status to snake
                    this.tiles[newSnakePos.tileX][newSnakePos.tileY].status = Tile.tileStatus.SNAKE;
                    return;
                }
            }
        }
        else {
            //move snake
            this.snake.update(newSnakePos);
            let lastSnakePos = this.snake.tiles[this.snake.tiles.length - 2];
            this.tiles[lastSnakePos.tileX][lastSnakePos.tileY].status = Tile.tileStatus.EMPTY;
            //change new tile status to snake
            this.tiles[newSnakePos.tileX][newSnakePos.tileY].status = Tile.tileStatus.SNAKE;
        }
    }

    getRandomTileW75P() {
        let maxW =Math.round(0.75 *(this.cols - 2) + 1);
        let minW = Math.round(0.25 * (this.cols - 1) + 1);
        let x = Math.floor(Math.random() * (maxW - minW) + minW);
        let maxH = Math.round(0.75 * (this.rows - 2));
        let minH = Math.round(0.25 * (this.rows - 1) + 1);
        let y = Math.floor(Math.random() * (maxH - minH) + minH);
        return this.tiles[x][y];
    }

    getRandomTile(maxX, maxY) {
        let col = Math.floor(Math.random() * (maxX - 1) + 1);
        let row = Math.floor(Math.random() * (maxY - 1) + 1);
        if(this.tiles[row][col] === undefined) return  this.getRandomTile(maxX, maxY);
        return this.tiles[row][col];
    }

    createFood() {
        let newFoodTile = this.getRandomTile(this.cols - 2, this.rows - 2);
        while(newFoodTile.status !== Tile.tileStatus.EMPTY) {
            newFoodTile = this.getRandomTile(this.cols - 2, this.rows - 2);
        }
        newFoodTile.status = Tile.tileStatus.FOOD;
        return new Food(newFoodTile)
    }

    getTile(x, y) {
        return this.tiles[x][y];
    }
}