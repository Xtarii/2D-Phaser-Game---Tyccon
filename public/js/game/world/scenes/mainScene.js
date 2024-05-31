const Phaser = require("phaser")
import Player from "../../entities/player/player.js"
import { Game, sleep } from "../../game.js"



/**
 * Main Scene
 */
export default class MainScene extends Phaser.Scene {
    /**
     * Local Player Object
     *
     * @type {Player}
     */
    static player





    /**
     * Creates Main Scene Instance
     */
    constructor(){
        super({ key: "main" }) // Sets Scene Name
    }


    async create(){
        MainScene.player = new Player()



        // this.floor = this.physics.add.staticImage(Game.spriteSize / 2, Game.spriteSize / 2, "floor")
        // this.physics.add.collider(this.player, this.floor)
        // const map = this.make.tilemap("map")
        // map.addTilesetImage("floor-map", "floor")

        const map = this.make.tilemap({key: "tilemap"})
        const tiles = map.addTilesetImage("Hotel tiles", "tileset")
        const ground = map.createLayer("ground", tiles)


        const wall = map.createLayer("wall", tiles)
        this.physics.add.collider(MainScene.player, wall) // Collision
        wall.setCollisionBetween(0, 100)


        ground.y = -1200
        ground.x = -600
        wall.y = -1200
        wall.x = -600


        this.cameras.main.startFollow(MainScene.player, true, 0.07, 0.07) // Camera Follow Player with small Delay
        this.cameras.main.setZoom(1.7)

        // Camera Bound ( Can't move outside this point ) set to map size
        this.cameras.main.setBounds(ground.x - 15, ground.y - 15, 1630, 1630)
    }

    update(){
        if(Game.server === undefined || Game.server.room === undefined) return // Returns if no Server Connection

        MainScene.player.update()
    }
}





/**
 * Checks if important Game Instances are loaded
 *
 * Will keep on running until all instances are loaded
 */
export async function checkGameInstances() {
    let loaded = false // Instances Loaded check

    // Check if Instances Exists
    while(true){
        if(MainScene.player !== undefined) loaded = true // Player Object

        // Exit Function
        if(loaded) break
        await sleep(1000) // Timeout 1 second
    }
}
