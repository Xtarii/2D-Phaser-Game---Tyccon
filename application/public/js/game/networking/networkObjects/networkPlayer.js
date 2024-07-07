const { Entity } = require("obesity-components")



/**
 * Network Player Object
 */
export default class NetworkPlayer extends Entity {
    constructor(scene, x, y, spriteID, name, depth){
        super(scene, x, y, spriteID, null, name, depth) // Parent ( Entity ) Setup
    }
}
