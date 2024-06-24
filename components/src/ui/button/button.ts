import UI, { PlacementType } from "../ui"





/**
 * Button Tint types
 */
enum TINT {
    /**
     * Button Normal Tint
     */
    NORMAL_TINT = 0xd0d0d0
}



/**
 * Simple Button
 */
export default class Button extends UI {
    /**
     * Creates Button Instance
     *
     * @param args Button Argmuents
     */
    constructor(...args: [Phaser.Scene, number, number, string, number?, PlacementType?]) {
        super(args[0], args[1], args[2], args[3], args[4], args[5])
        this.setInteractive() // Sets Object to Interactive
    }
}
