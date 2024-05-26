/**
 * Game DEBUG and TEST
 *
 * This is far from what the game will be
 * - OBS: Remove this after TESTING
 */
const Phaser = require("phaser")

import { Server } from "./networking/server.js"
import { Hotel } from "./world/scenes/buildings/hotel.js"
import { Preloader } from "./world/scenes/preloader.js"



/**
 * Hotel Tycoon Game
 *
 * Game Instance and Tools
 */
export class Game extends Phaser.Game {
    /**
     * Sprite Size
     *
     * Sprites and Tiles Base Size,
     * sprites can use other sizes,
     * but 64x64 pixels is the base.
     */
    static size = 64
    /**
     * Game Server Instance
     *
     * Handles Online Part of the Game.
     * Connections, Positions and buildings
     * data is handles by this instance
     *
     * @type {Server}
     */
    static server



    /**
     * Creates Game Instance
     *
     * @param {object} config Game Config
     */
    constructor(config) {
        super(config) // Creates Game
        Game.server = new Server() // Creates Server
    }
}





// Game Config
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [Preloader, Hotel],

    physics: {
        default: 'arcade',

        // DEBUG
        arcade: {
            debug: true
        }
    }
}

/**
 * Game Instance
 *
 * @type {Game}
 */
export const game = new Game(config)
