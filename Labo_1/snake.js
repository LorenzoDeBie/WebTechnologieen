class Snake {

    constructor(point) {
        this.color = "#FF0000";
        this.positions = [point, null];
        this.currentDirection = "H";
        this.velX = 1;
        this.velY = 0;
        this.alive = true;
        this.snakeSize = 10;
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

    move(newX, newY, index = 0) {
        if(this.positions[index] !== null) {
            let point = this.positions[index];
            this.move(point.posX, point.posY, index+1);
            point.posX = newX;
            point.posY = newY;
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
        this.tilesX = Math.floor(width / tileSize);
        this.tilesY = Math.floor(height / tileSize);
        this.tileSize = tileSize;
        let startPointSnake = this.giveRandomPoint();
        this.snake = new Snake(startPointSnake);
        this.foodPositions = [];
        for(let i = 0; i < nFoods; i ++) {
            this.foodPositions.push(this.createFood());
        }
    }

    createFood() {
        return new Food(this.giveRandomPoint());
    }

    giveRandomPoint() {
        let maxW = this.tilesX * 0.75;
        let minW = 0.25 * this.tilesX;
        let x = Math.floor(Math.random() * (maxW - minW) + minW);
        let maxH = this.tilesY * 0.75;
        let minH = 0.25 * this.tilesY;
        let y = Math.floor(Math.random() * (maxH - minH) + minW);
        return new Point(x, y);
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
}

class Food {
    static ImageUrls = ["food1.png", "food2.png", "food3.png", "food4.png", "food5.png"];
    constructor(posX, posY) {
        this.position = new Point(posX, posY);
        this.imageUrl = "images/food" + Math.floor(Math.random() * (Food.ImageUrls.length - 1) + 1) + ".png";
    }
}

class Point {
    constructor(tileX, tileY) {
        this.posX = tileX;
        this.posY = tileY;
    }
}