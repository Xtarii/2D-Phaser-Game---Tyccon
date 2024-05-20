const { Physics } = require("phaser")



export class Entity extends Physics.Arcade.Sprite {
    /**
     * Entity Speed
     */
    speed = 75
    /** 
     * Entity damp speed 
     * 
     * Damping Entity speed, to deley abropt stop
    */
    dampSpeed = 0.9
}
