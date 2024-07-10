import { PlacementType, UISprite } from ".."
import { sleep } from "obesity-utils"





/**
 * Button Tint types
 */
export enum TINT {
    /**
     * Button Normal Tint
     */
    NORMAL_TINT = 0xd0d0d0
}



/**
 * Simple Button
 */
export default class Button extends UISprite {
    /**
     * Creates Button Instance
     *
     * @param args Button Arguments
     */
    constructor(...args: [Phaser.Scene, number, number, string, number?, PlacementType?]) {
        super(args[0], args[1], args[2], args[3], args[4], args[5])
        this.sprite.setInteractive() // Sets Object to Interactive
    }



    /**
     * Adds Button Click Callback function
     *
     * Automatically sets and removes button tint.
     *
     * @param callback Callback
     * @param tint TINT
     * @param resetDelay Delay
     */
    addButtonClickCallback = (callback: () => void, tint?: TINT, resetDelay?: number) => {
        this.sprite.on("pointerdown", () => {
            this.sprite.setTint(tint ?? TINT.NORMAL_TINT) // Changes Tint
            callback() // Calls callback

            sleep(resetDelay ?? 250).then(() => this.sprite.clearTint()) // Removes Tint after delay
        })
    }
}
