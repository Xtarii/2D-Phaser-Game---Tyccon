const { Physics } = require("phaser")



export class Entity extends Physics.Arcade.Sprite {
    /**
     * Entity Speed
     */
    speed = 200
    /** 
     * Entity damp speed 
     * 
     * Damping Entity speed, to deley abropt stop
    */
    dampSpeed = 0.9
}
