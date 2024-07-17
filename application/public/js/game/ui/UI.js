import HUD from "./hud.js";



/**
 * Game UI Manager
 */
export default class GameUI {
    /**
     * Game HUD
     *
     * UI That is shown on screen by default.
     *
     * @type {HUD}
     */
    gameHUD



    /**
     * UI Manager setup
     *
     * @param {Phaser.Scene} scene Main Scene
     */
    constructor(scene) {
        this.gameHUD = new HUD(scene) // Game HUD Setup
    }
}
