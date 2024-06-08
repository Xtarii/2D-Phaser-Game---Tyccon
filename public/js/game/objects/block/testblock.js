const { Physics } = require("phaser")
import { Game } from "../../game.js"



/**
 * Test Interaction Object for Test Interactions
 */
export default class TestBlockInteraction extends Physics.Arcade.Sprite {
    interactable = true



    constructor(x, y, name){
        super(Game.scene.getScene("main"), x, y, "player")
        this.setDepth(1)

        this.name = name


        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
    }
}
