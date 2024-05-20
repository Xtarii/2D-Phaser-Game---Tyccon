import { Player } from "../../../entities/player/player.js"
import { BaseScene } from "../scenes.js"

const Phaser = require("phaser")



export class Hotel extends BaseScene {
    preload(){
        this.load.image("player", "assets/player/player.png") // DEBUG
    }

    create(){
        this.player = new Player()


        this.cameras.main.startFollow(this.player, true, 0.1, 0.1) // Camera Follow Player with small Delay
    }

    update(){
        this.player.update()
    }
}
