import { Player } from "../../../entities/player/player.js"
import { Game } from "../../../game.js"

const Phaser = require("phaser")



/**
 * Main Hotel Scene
 */
export class Hotel extends Phaser.Scene {
    constructor(){
        super("hotel") // Sets Scene Name
    }



    create(){
        this.player = new Player()



        // this.floor = this.physics.add.staticImage(Game.spriteSize / 2, Game.spriteSize / 2, "floor")
        // this.physics.add.collider(this.player, this.floor)
        // const map = this.make.tilemap("map")
        // map.addTilesetImage("floor-map", "floor")

        const map = this.make.tilemap({key: "tilemap"})
        const tiles = map.addTilesetImage("Hotel tiles", "tileset")
        map.createLayer("ground", tiles)

        const wall = map.createLayer("wall", tiles)
        this.physics.add.collider(this.player, wall) // Collision
        wall.setCollisionBetween(0, 100)


        this.cameras.main.startFollow(this.player, true, 0.07, 0.07) // Camera Follow Player with small Delay
        this.cameras.main.setZoom(1.75)
    }

    update(){
        this.player.update()
    }
}
