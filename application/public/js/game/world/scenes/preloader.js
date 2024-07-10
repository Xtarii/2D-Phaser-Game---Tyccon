const Phaser = require("phaser")



export default class Preloader extends Phaser.Scene {
    constructor(){
        super("preloader") // Sets Preload Scene key
    }


    preload(){
        // Interaction Button Load
        this.load.spritesheet("interact key", "assets/ui/buttons/interact.png", {frameWidth: 16, frameHeight: 16})
        this.load.image("build menu - panel", "assets/ui/panels/UI Panel - Build Menu.png")



        // this.load.image("player", "assets/player/player.png") // DEBUG
        // this.load.image("player", "assets/extras-add-later/people/Cool guy.png") // DEBUG
        this.load.image("player", "assets/extras-add-later/people/fat guy 2.0.png") // DEBUG
        this.load.image("phak", "assets/extras-add-later/people/Phak.png")

        this.load.image("Dr. Time", "assets/characters/dev/Dr. Time.png")

        this.load.image("big guy", "assets/extras-add-later/people/morbidly obese guy.png")
        this.load.image("Mohammed", "assets/extras-add-later/people/Mohammed.png")

        this.load.image("Ben 10", "assets/extras-add-later/people/Ben 10.png")



        this.load.image("tileset", "assets/extras-add-later/Hotel tiles.png")
        this.load.tilemapTiledJSON("tilemap", "assets/extras-add-later/tile-test/tilemap.json")


        this.load.image("tilset2", "assets/extras-add-later/64 upscale.png")
        this.load.tilemapTiledJSON("tilemaptest","assets/extras-add-later/tile-test/tilemaptest.json")


        // New Map
        this.load.image("hotel tileset", "assets/tiles/hotel/Hotel tiles.png")
        this.load.tilemapTiledJSON("hotel tilemap", "assets/tiles/hotel/hotel tilemap.json")
    }


    create(){
        this.scene.start("main") // Loads Next Scene
    }
}
