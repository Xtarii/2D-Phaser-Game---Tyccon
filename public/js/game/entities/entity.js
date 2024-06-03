const { Physics } = require("phaser")



/**
 * Entity Base Class
 */
export default class Entity extends Physics.Arcade.Sprite {
    /**
     * Entity Speed
     */
    speed = 75
    /**
     * Entity damp speed
     *
     * Damping Entity speed, to deley abropt stop
    */
    dampSpeed = 0.7


    /**
     * Entity Name
     */
    name = "Entity"





    /**
     * Creates Entity Instance
     *
     * - Creates Body
     * - Creates Name Display
     *
     * @param {Phaser.Scene} scene Game Scene
     * @param {number} x X Position
     * @param {number} y Y Position
     * @param {string} spriteID Sprite ID
     * @param {string} name Entity Name
     */
    constructor(scene, x, y, spriteID, name){
    }
}
