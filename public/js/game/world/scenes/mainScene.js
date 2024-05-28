import { Player } from "../../entities/player/player.js"

const Phaser = require("phaser")



/**
 * Main Scene
 */
export class MainScene extends Phaser.Scene {
    /**
     * Local Player Object
     *
     * @type {Player}
     */
    static player
    /**
     * Scene Spawn Radius
     */
    static spawnRadius = 200





    /**
     * Creates Main Scene Instance
     */
    constructor(){
        super("main") // Sets Scene Name
    }


    create(){
        MainScene.player = new Player()



        // this.floor = this.physics.add.staticImage(Game.spriteSize / 2, Game.spriteSize / 2, "floor")
        // this.physics.add.collider(this.player, this.floor)
        // const map = this.make.tilemap("map")
        // map.addTilesetImage("floor-map", "floor")

        const map = this.make.tilemap({key: "tilemap"})
        const tiles = map.addTilesetImage("Hotel tiles", "tileset")
        map.createLayer("ground", tiles)


        const wall = map.createLayer("wall", tiles)
        this.physics.add.collider(MainScene.player, wall) // Collision
        wall.setCollisionBetween(0, 100)


        this.cameras.main.startFollow(MainScene.player, true, 0.07, 0.07) // Camera Follow Player with small Delay
        this.cameras.main.setZoom(1.7)
    }

    update(){
        MainScene.player.update()
    }
}
