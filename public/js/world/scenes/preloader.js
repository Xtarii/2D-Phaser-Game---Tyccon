const Phaser = require("phaser")



export class Preloader extends Phaser.Scene {
    constructor(){
        super("preloader") // Sets Preload Scene key
    }


    preload(){
        this.load.image("player", "assets/player/player.png") // DEBUG



        this.load.image("floor", "assets/tiles/Floor-test.png")
    }


    create(){
        this.scene.start("hotel") // Loads Next Scene
    }
}
