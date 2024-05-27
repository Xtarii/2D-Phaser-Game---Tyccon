const Phaser = require("phaser")



export class Preloader extends Phaser.Scene {
    constructor(){
        super("preloader") // Sets Preload Scene key
    }


    preload(){
        // this.load.image("player", "assets/player/player.png") // DEBUG
        this.load.image("player", "assets/extras-add-later/people/fat guy 2.0.png") // DEBUG
        // this.load.image("player", "assets/extras-add-later/people/fat guy.png") // DEBUG
        this.load.image("phak", "assets/extras-add-later/people/Phak.png")



        this.load.image("tileset", "assets/extras-add-later/Hotel tiles.png")
        this.load.tilemapTiledJSON("tilemap", "assets/extras-add-later/tile-test/tilemap.json")
    }


    create(){
        this.scene.start("main") // Loads Next Scene
    }
}
