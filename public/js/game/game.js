/**
 * Game DEBUG and TEST
 *
 * This is far from what the game will be
 * - OBS: Remove this after TESTING
 */
const Phaser = require("phaser")

import Server from "./networking/server.js"
import MainScene from "./world/scenes/mainScene.js"
import Preloader from "./world/scenes/preloader.js"



/**
 * Hotel Tycoon Game
 *
 * Game Instance and Tools
 */
class BaseGame extends Phaser.Game {
    /**
     * Sprite Size
     *
     * Sprites and Tiles Base Size,
     * sprites can use other sizes,
     * but 64x64 pixels is the base.
     */
    size = 64
    /**
     * Game Server Instance
     *
     * Handles Online Part of the Game.
     * Connections, Positions and buildings
     * data is handles by this instance
     *
     * @type {Server}
     */
    server



    /**
     * Creates Game Instance
     *
     * @param {object} config Game Config
     */
    constructor(config) {
        super(config) // Creates Game
        this.server = new Server() // Creates Server
    }
}





// Game Config
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [Preloader, MainScene],

    physics: {
        default: 'arcade',

        // DEBUG
        arcade: {
            debug: true
        }
    },
}

/**
 * Game Instance
 *
 * @type {BaseGame}
 */
export const Game = new BaseGame(config)



/**
 * Sleep Function
 *
 * ```js
 * await sleep(1000) // 1 second sleep
 * ```
 *
 * @param {number} ms Milliseconds
 * @returns Promise
 */
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
