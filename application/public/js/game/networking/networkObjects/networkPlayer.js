const { Runtime } = require("obesity-utils")
const { Entity } = require("obesity-components")



/**
 * Network Player Object
 */
export default class NetworkPlayer extends Entity {
    constructor(scene, x, y, l, spriteID, name, depth){
        super(scene, x, y, l, spriteID, null, name, depth) // Parent ( Entity ) Setup
    }



    update() {
        super.update()

        // Network Render Level Check
        // if(this.level !== Runtime.Player.getLocation().l) this.setVisible(false)
        // else this.setVisible(true)
    }
}
