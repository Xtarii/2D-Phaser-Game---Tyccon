const { BASE } = require("obesity-utils")
const Phaser = require("phaser")



export default class Preloader extends Phaser.Scene {
    constructor(){
        super("preloader") // Sets Preload Scene key
    }


    preload(){
        // Interaction Button Load

        // this.load.spritesheet("interact key", "assets/ui/buttons/interact.png", {frameWidth: 16, frameHeight: 16})
        this.load.image("interact key", BASE + "/application/public/assets/ui/buttons/interact.png")

        // Tabs
        this.load.image("Tab Button", BASE + "/application/public/assets/ui/menu/tabs/tab.png") // TAB Main
        this.load.image("Tab buttons: Build", BASE + "/application/public/assets/ui/menu/tabs/icons/build.png")
        this.load.image("Tab Buttons: Home", BASE + "/application/public/assets/ui/menu/tabs/icons/home.png")

        this.load.image("hotel-manager background", BASE + "/application/public/assets/ui/panels/UI Panel - Build Menu.png")



        // this.load.image("player", "assets/player/player.png") // DEBUG
        // this.load.image("player", "assets/extras-add-later/people/Cool guy.png") // DEBUG
        this.load.image("player", BASE + "/application/public/assets/extras-add-later/people/fat guy 2.0.png") // DEBUG
        this.load.image("phak", BASE + "/application/public/assets/extras-add-later/people/Phak.png")

        this.load.image("Dr. Time", BASE + "/application/public/assets/characters/dev/Dr. Time.png")

        this.load.image("big guy", BASE + "/application/public/assets/extras-add-later/people/morbidly obese guy.png")
        this.load.image("Mohammed", BASE + "/application/public/assets/extras-add-later/people/Mohammed.png")

        this.load.image("Ben 10", BASE + "/application/public/assets/extras-add-later/people/Ben 10.png")



        this.load.image("tileset", BASE + "/application/public/assets/extras-add-later/Hotel tiles.png")
        this.load.tilemapTiledJSON("tilemap", BASE + "/application/public/assets/extras-add-later/tile-test/tilemap.json")


        this.load.image("tilset2", BASE + "/application/public/assets/extras-add-later/64 upscale.png")
        this.load.tilemapTiledJSON("tilemaptest", BASE + "/application/public/assets/extras-add-later/tile-test/tilemaptest.json")


        // New Map
        this.load.image("hotel tileset", BASE + "/application/public/assets/tiles/hotel/Hotel tiles.png")
        this.load.tilemapTiledJSON("hotel tilemap", BASE + "/application/public/assets/tiles/hotel/hotel tilemap.json")
    }


    create(){
        this.scene.start("main") // Loads Next Scene
    }
}
