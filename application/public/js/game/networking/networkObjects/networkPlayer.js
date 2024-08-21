const { Entity } = require("obesity-components")



/**
 * Network Player Object
 */
export default class NetworkPlayer extends Entity {
    constructor(scene, x, y, l, spriteID, name, depth){
        super(scene, x, y, l, spriteID, null, name, depth) // Parent ( Entity ) Setup
    }
}
