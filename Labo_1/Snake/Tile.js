export default class Tile {

    //enum for tile status
    static tileStatus = {
        EMPTY: 0,
        WALL: 1,
        SNAKE: 2,
        FOOD: 3
    };

    tileX; tileY; status;

    constructor(x, y, status) {
        this.tileX = x;
        this.tileY = y;
        this.status = status;
    }
}