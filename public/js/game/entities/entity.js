const { Physics } = require("phaser")



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
}
