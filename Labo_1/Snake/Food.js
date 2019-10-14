export default class Food {
    static ImageUrls = ["food1.png", "food2.png", "food3.png", "food4.png", "food5.png"];
    static ImageWidth = 10; static ImageHeight = 10;

    position;
    image;

    constructor(tile) {
        this.position = tile;
        let image = new Image(Food.ImageWidth, Food.ImageHeight);
        image.src = "images/food" + Math.floor(Math.random() * (Food.ImageUrls.length - 1) + 1) + ".png";
        this.image = image;
    }
}