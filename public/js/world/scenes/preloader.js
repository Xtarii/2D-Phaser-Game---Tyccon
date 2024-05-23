const Phaser = require("phaser")



export class Preloader extends Phaser.Scene {
    constructor(){
        super("preloader") // Sets Preload Scene key
    }


    preload(){
        this.load.image("player", "assets/player/player.png") // DEBUG



        this.load.image("tileset", "assets/extras-add-later/Hotel tiles.png")
        this.load.tilemapTiledJSON("tilemap", "assets/extras-add-later/tile-test/tilemap.json")
    }


    create(){
        this.scene.start("hotel") // Loads Next Scene
    }
}
