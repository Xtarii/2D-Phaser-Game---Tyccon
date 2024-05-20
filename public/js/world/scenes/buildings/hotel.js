import { Player } from "../../../entities/player/player.js"
import { Game } from "../../../game.js"
import { BaseScene } from "../scenes.js"

const Phaser = require("phaser")



export class Hotel extends BaseScene {
    preload(){
        this.load.image("player", "assets/player/player.png") // DEBUG

        this.load.image("floor", "assets/tiles/Floor-test.png")
    }

    create(){
        this.player = new Player()



        this.floor = this.physics.add.staticImage(Game.spriteSize / 2, Game.spriteSize / 2, "floor")
        this.physics.add.collider(this.player, this.floor)


        this.cameras.main.startFollow(this.player, true, 0.1, 0.1) // Camera Follow Player with small Delay
        this.cameras.main.setZoom(1.75)
    }

    update(){
        this.player.update()
    }
}
