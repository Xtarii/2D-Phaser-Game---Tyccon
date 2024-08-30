const { Text } = require("obesity-components")
const { Runtime } = require("obesity-utils")



/**
 * Game HUD Object
 */
export default class HUD {
    /**
     * Creates Game HUD Instance
     *
     * @param {Phaser.Scene} scene Game Scene
     */
    constructor(scene) {
        this.money = new Text(scene, 450, 10, (Runtime.Player.getMoney() + " B"))
        this.money.x = 450 - this.money.displayWidth
    }
}
