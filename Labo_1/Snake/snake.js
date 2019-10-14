import Tile from "./Tile.js";

export default class Snake {

    static snakeDirections = {
        UP: 0,
        RIGHT: 1,
        DOWN: 2,
        LEFT: 3
    };

    tiles;
    direction;
    velocity;
    alive;

    constructor(startTile) {
        this.tiles = [startTile, null];
        startTile.status = Tile.tileStatus.SNAKE;
        this.direction = Snake.snakeDirections.RIGHT;
        this.velocity = 1;
        this.alive = true;
    }

    update(newSnakePos) {
        this.tiles.splice(this.tiles.length - 2, 1);
        this.tiles.unshift(newSnakePos);
    }

    getCurrentPos() {
        return this.tiles[0];
    }

    grow(newSnakePos) {
        this.tiles.unshift(newSnakePos);
    }
}