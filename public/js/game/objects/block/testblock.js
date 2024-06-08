const { Physics } = require("phaser")
import { Game } from "../../game"



/**
 * Test Interaction Object for Test Interactions
 */
export default class TestBlockInteraction extends Physics.Arcade.Sprite {
    constructor(){
        super(Game.scene.getScene("main"), 100, 100, "player")
    }
}
