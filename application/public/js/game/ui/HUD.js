import MainScene from "../world/scenes/mainScene.js"

const { Button } = require("obesity-components")



/**
 * Game HUD Object
 */
export default class HUD {
    /**
     * Build Mode Button
     *
     * @type {Button}
     */
    buildModeButton



    /**
     * Creates Game HUD Instance
     *
     * @param {Phaser.Scene} scene Game Scene
     */
    constructor(scene) {
        this.buildModeButton = new Button("E", scene, 16 / 2, 16 / 2, "interact key") // Build Mode Button
        this.buildModeButton.addButtonClickCallback(() => MainScene.player.buildMode.buildMode())
    }



    /**
     * Hides HUD Objects for Build Mode
     */
    enterBuildMode = () => {
        console.log("Hides HUD")
    }
    /**
     * Exits HUD Build Mode
     */
    exitBuildMode = () => {
        console.log("Shows HUD")
    }
}