import { Player } from "../../../entities/player/player.js"
import { BaseScene } from "../scenes.js"

const Phaser = require("phaser")



export class Hotel extends BaseScene {
    preload(){
        this.load.image("player", "assets/player/player.png") // DEBUG
    }

    create(){
        this.player = new Player()
    }

    update(){
        this.player.update()
    }
}
