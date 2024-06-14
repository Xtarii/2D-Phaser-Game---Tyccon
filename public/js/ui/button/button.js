import UI from "../gui.js"



/**
 * Simple Button
 */
export default class Button extends UI {
    /**
     * Creates Button Instance
     *
     * @param  {...{
     * scene: Phaser.Scene,
     * x: number,
     * y: number,
     * spriteID: string,
     * frame: number,
     * placementType: UI.placementType
     * }} args Button Arguments
     */
    constructor(...args){
        super(args[0], args[1], args[2], args[3], args[4], args[5]) // Calls Super with Arguments
        this.setInteractive() // Sets Object to Interactive
    }
}
