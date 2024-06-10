const Phaser = require("phaser")
import { sleep } from "../../../utils/time.js"
import Player from "../../objects/entities/player/player.js"
import { Game } from "../../game.js"
import UI from "../../../ui/gui.js"

import TestBlockInteraction from "../../objects/block/testblock.js"



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
        // Test Interaction Block
        new TestBlockInteraction(0, 2900, "1")
        new TestBlockInteraction(100, 2900, "2")

        new UI(this, 400, 300, "interact key")






        MainScene.player = new Player()



        // this.floor = this.physics.add.staticImage(Game.spriteSize / 2, Game.spriteSize / 2, "floor")
        // this.physics.add.collider(this.player, this.floor)
        // const map = this.make.tilemap("map")
        // map.addTilesetImage("floor-map", "floor")

        const map = this.make.tilemap({key: "hotel tilemap"})
        const tiles = map.addTilesetImage("Hotel tiles", "hotel tileset")
        const ground = map.createLayer("ground", tiles)


        const wall = map.createLayer("wall", tiles)
        this.physics.add.collider(MainScene.player, wall) // Collision
        wall.setCollisionBetween(0, 100)


        const dec = map.createLayer("decoration", tiles)



        ground.x = -ground.width / 2
        ground.y = -ground.height / 2
        wall.x = -wall.width / 2
        wall.y = -wall.height / 2

        dec.x = -dec.width / 2
        dec.y = -dec.height / 2


        this.cameras.main.startFollow(MainScene.player, true, 0.07, 0.07) // Camera Follow Player with small Delay
        this.cameras.main.setZoom(1.7)

        // Camera Bound ( Can't move outside this point ) set to map size
        this.cameras.main.setBounds(
            -ground.width / 2 - 15,
            -ground.height / 2 - 15,

            ground.width + 30,
            ground.height + 30
        )
    }

    update(){
        if(Game.server === undefined || Game.server.room === undefined) return // Returns if no Server Connection

        MainScene.player.update()



        // UI Update
        UI.updateAll()
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
