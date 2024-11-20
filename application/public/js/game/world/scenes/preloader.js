const { BASE } = require("obesity-utils")
const Phaser = require("phaser")
const path = require("path")



export default class Preloader extends Phaser.Scene {
    constructor(){
        super("preloader") // Sets Preload Scene key
    }


    preload(){
        this.load.image("tileset", BASE + "/application/public/assets/extras-add-later/Hotel tiles.png")
        this.load.tilemapTiledJSON("tilemap", BASE + "/application/public/assets/extras-add-later/tile-test/tilemap.json")


        this.load.spritesheet("tilset2", BASE + "/application/public/assets/extras-add-later/64 upscale.png", {frameWidth: 64, frameHeight: 64})
        this.load.tilemapTiledJSON("tilemaptest", BASE + "/application/public/assets/extras-add-later/tile-test/tilemaptest.json")


        // Sprites
        loadSprites(this.load)

        // Tiles and Tilemaps
        loadTilesets(this.load)
        loadTilemaps(this.load)
    }


    create(){
        this.scene.start("main") // Loads Next Scene
    }
}



/**
 * Loads Sprites
 *
 * @param {Phaser.Loader.LoaderPlugin} loader Loader
 */
function loadSprites(loader) {
    // UI Sprites
    loader.image("interact key", path.join(BASE, "/assets/sprites/UI/buttons/interact.png"))
    loader.image("close button", path.join(BASE, "/assets/sprites/UI/buttons/exit_button.png"))

    // Tabs
    loader.image("Tab Button", BASE + "/application/public/assets/ui/menu/tabs/tab.png") // TAB Main
    loader.image("Tab buttons: Build", BASE + "/application/public/assets/ui/menu/tabs/icons/build.png")
    loader.image("Tab Buttons: Home", BASE + "/application/public/assets/ui/menu/tabs/icons/home.png")

    loader.image("hotel-manager background", path.join(BASE, "/assets/sprites/UI/panels/panel.png"))


    // Entities
    loader.image("player", BASE + "/application/public/assets/extras-add-later/people/fat guy 2.0.png") // DEBUG
    loader.image("phak", BASE + "/application/public/assets/extras-add-later/people/Phak.png")

    loader.image("Dr. Time", BASE + "/application/public/assets/characters/dev/Dr. Time.png")

    loader.image("big guy", BASE + "/application/public/assets/extras-add-later/people/morbidly obese guy.png")
    loader.image("Mohammed", BASE + "/application/public/assets/extras-add-later/people/Mohammed.png")

    loader.image("Ben 10", BASE + "/application/public/assets/extras-add-later/people/Ben 10.png")

    loader.image("PC", BASE + "assets/Tiles/Dator och bord.png")

}

/**
 * Loads Tilesets
 *
 * @param {Phaser.Loader.LoaderPlugin} loader Loader
 */
function loadTilesets(loader) {
    loader.spritesheet("base", path.join(BASE, "/assets/hotelTiles.png"), { frameWidth: 64, frameHeight: 64 })
}

/**
 * Loads Tilemaps
 *
 * Tilemaps are loaded as
 * ```js
 * scene:<id>
 * lvl:<level>
 *
 * // Example
 * "room:1 lvl:1"
 * ```
 *
 * @param {Phaser.Loader.LoaderPlugin} loader Loader
 */
function loadTilemaps(loader) {
    loader.tilemapTiledJSON("room:1 lvl:1", path.join(BASE, "/assets/rum1_lvl1.json"))
    loader.tilemapTiledJSON("lobby", path.join(BASE, "assets/Lobby test.json"))
}
