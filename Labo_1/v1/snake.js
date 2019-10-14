class Snake {

    constructor(point, playfield) {
        this.color = "#FF0000";
        this.positions = [point, null];
        this.currentDirection = "H";
        this.velX = 1;
        this.velY = 0;
        this.alive = true;
        this.snakeSize = 10;
        this.parent = playfield;
    }

    getPositionX() {
        return this.positions[0].posX;
    }

    getPositionY() {
        return this.positions[0].posY;
    }

    moveSnake(){
        if(this.alive) {
            let posX = this.positions[0].posX;
            let posY = this.positions[0].posY;
            if (this.currentDirection === "H") {
                posX += this.velX;
                if (posX < 0 || posX > this.canvasWidth - this.snakeSize) {
                    this.alive = false;
                }
            } else if (this.currentDirection === "V") {
                posY += this.velY;
                if (posY < 0 || posY > this.canvasHeight - this.snakeSize) {
                    this.alive = false;
                }
            }
            this.move(posX, posY, 0);
        }
    }

    move(newTile, index = 0) {
        if(this.positions[index] !== null) {
            this.move(this.positions[index], index+1);
            this.positions[index] = newTile;
        }
    }

    grow() {

    }

    changeDirection(newDirection) {
        if(newDirection === "right") {
            this.currentDirection = "H";
            this.velX = 1;
            this.velY = 0;
        }
        else if(newDirection === "left") {
            this.currentDirection = "H";
            this.velX = -1;
            this.velY = 0;
        }
        else if(newDirection === "up") {
            this.currentDirection = "V";
            this.velY = -1;
            this.velX = 0;
        }
        else if(newDirection === "down") {
            this.currentDirection = "V";
            this.velY = 1;
            this.velX = 0;
        }
        console.log("New Direction: " + newDirection);
    }

}

export default class playField {
    constructor(width, height, tileSize, nFoods) {
        let tilesX = Math.floor(width / tileSize);
        let tilesY = Math.floor(height / tileSize);
        this.tileSize = tileSize;
        this.tiles = [];
        //create the playing field
        for(let i = 0; i < tilesX; i++) {
            let row = [];
            for(let n = 0; n < tilesY; n++) {
                row.push(new Tile(i, n));
            }
            this.tiles.push(row);
        }
        //get random start point for snake
        let startPointSnake = this.giveRandomTile();
        this.snake = new Snake(startPointSnake);
        this.foodPositions = [];
        this.foods = [];
        for(let i = 0; i < nFoods; i ++) {
            this.foodPositions.push(this.createFood());
        }
    }

    createFood() {
        return new Food(this.giveRandomTile());
    }

    giveRandomTile() {
        let maxW = this.tiles.length * 0.75;
        let minW = 0.25 * this.tiles.length;
        let x = Math.floor(Math.random() * (maxW - minW) + minW);
        let maxH = this.tiles[0].length * 0.75;
        let minH = 0.25 * this.tiles[0].length;
        let y = Math.floor(Math.random() * (maxH - minH) + minW);
        return this.tiles[x][y];
    }

    gameUpdate() {
        this.snake.moveSnake();
        console.log("X: " + this.snake.getPositionX());
        console.log("Y: " + this.snake.getPositionY());
        console.log("Alive: " + this.snake.alive);
    }

    getSnakePosition(index) {
        let pos = this.snake.positions[index];
        return new Point(pos.posX * this.snake.snakeSize, pos.posY * this.snake.snakeSize);
    }

    getTile(x, y) {
        return this.tiles[x][y];
    }
}

class Food {
    static ImageUrls = ["food1.png", "food2.png", "food3.png", "food4.png", "food5.png"];
    static ImageWidth; static ImageHeight;
    constructor(tile) {
        this.position = tile;
        let image = new Image(Food.ImageWidth, Food.ImageHeight);
        image.src = "images/food" + Math.floor(Math.random() * (Food.ImageUrls.length - 1) + 1) + ".png";
        this.image = image;
    }
}

class Tile {
    constructor(tileX, tileY) {
        this.relX = tileX;
        this.relY = tileY;
    }
}