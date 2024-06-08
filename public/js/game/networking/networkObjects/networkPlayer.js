import Entity from "../../objects/entities/entity.js"



/**
 * Network Player Object
 */
export default class NetworkPlayer extends Entity {
    constructor(scene, x, y, spriteID, name, depth){
        super(scene, x, y, spriteID, name, depth) // Parent ( Entity ) Setup
    }
}
