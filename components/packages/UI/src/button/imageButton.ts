import { sleep } from "obesity-utils"
import { PlacementType, TINT, UISprite } from ".."



/**
 * ## Simple Image Button
 *
 * Note that ```Button``` uses a text
 * as inner content and this UI Button
 * uses an image.
 *
 *
 * ### Text Button
 * If you need a ```Button``` with text, then
 * you should use the normal Button
 * ```ts
 * // Creates a UI Button with Text as content
 * //
 * // Perfect for "interact buttons"
 * const button = new Button(<args>)
 * ```
 *
 *
 * ### Image Button
 * But if you need a button with just an image ( No Text )
 * ```ts
 * // Creates a UI Image Button ( NO TEXT )
 * //
 * // Perfect for indications like "mode switch"
 * const imageButton = new ImageButton(<args>)
 * ```
 *
 * ---------------------------------------------------
 * I recommend to use Text Button for simple stuff like
 * - Buy
 * - Interact
 *
 * And other buttons that just needs a short text or
 * one letter.
 *
 * If you need to make a Button with more meaning
 * you can use this button. This button is good for
 * - Indicating that the game mode will switch
 * - By clicking this you will get "something"
 *
 * And other buttons that have a long meaning that can
 * not fit into one short 3 letter word or 1 letter.
 *
 * ---------------------------------------------------
 *
 * The Text Button took a lot of time to make while this
 * was just to assemble so from a time stand point,
 * please consider using Text ```Button```.
 * And because ```Button``` has the
 * ***[Standard Galactic Font - Evil, INC](https://fontstruct.com/fontstructions/download/2505471)***
 * as ```Font Family``` so the text looks so good.
 */
export default class ImageButton extends UISprite {
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
