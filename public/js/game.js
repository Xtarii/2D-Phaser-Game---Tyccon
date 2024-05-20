/**
 * Game DEBUG and TEST
 *
 * This is far from what the game will be
 * - OBS: Remove this after TESTING
 */
const Phaser = require("phaser")

import { Hotel } from "./world/scenes/buildings/hotel.js"



/**
 * Hotel Tycoon Game
 *
 * Game Instance and Tools
 */
export class Game extends Phaser.Game {
    /**
     * Sprite Size
     *
     * The Size all sprites **SHOULD** use
     */
    static spriteSize = 32



    /**
     * Creates Game Instance
     *
     * @param {object} config Game Config
     */
    constructor(config) {
        super(config) // Creates Game
    }
}





// Game Config
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Hotel,
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
 */
export const game = new Game(config)
