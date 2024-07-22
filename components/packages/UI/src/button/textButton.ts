import { Button, PlacementType, Text, TextConfig, UISprite } from ".."
import { sleep } from "obesity-utils"
import { styles } from "../text/styles"



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
export class TextButton extends Button {
    /**
     * UI Button Text
     */
    private _text: Text



    /**
     * Creates Button Instance
     *
     * This button has text as content.
     * But it still needs an Image as
     * a background UI.
     *
     * @param text Button Text
     * @param args Button Arguments
     */
    constructor(text: string, ...args: [Phaser.Scene, number, number, string, number?, PlacementType?, textConfig?: TextConfig]) {
        super(args[0], args[1], args[2], args[3], args[4], args[5])

        // Creates Button Text
        this._text = new Text(this.scene, args[1] + 1, args[2], text, {
            placementType: args[6]?.placementType ?? this._placementType,
            padding: args[6]?.padding ?? { x: 1, y: 1 },
            style: args[6]?.style ?? styles.BUTTON_NORMAL
        })

        // Adds text objects body to this body
        for(var i in this._text.body) this._body.push(this._text.body[i])
    }



    /**
     * Set Button Text
     *
     * Sets this buttons Text
     *
     * @param text Button Text
     */
    setText = (text: string) => { this._text.setText(text) }



    addButtonClickCallback = (callback: () => void, tint?: TINT, resetDelay?: number) => {
        this.sprite.on("pointerdown", () => {
            this.sprite.setTint(tint ?? TINT.NORMAL_TINT) // Changes Tint
            this._text.setTint(tint ?? TINT.NORMAL_TINT)
            callback() // Calls callback

            sleep(resetDelay ?? 250).then(() => {
                this.sprite.clearTint()
                this._text.clearTint()
            }) // Removes Tint after delay
        })
    }



    destroy() {
        this._text.destroy() // Removes Text
        super.destroy() // Removes this
    }





    set x(x: number) {
        super.x = x
        this._text.x = (this._x - (this._text.displayWidth / 2)) + 1
    }
    set y(y: number) {
        super.y = y
        this._text.y = this._y - (this._text.displayHeight / 2)
    }

    /**
     * Button Text Element
     */
    get text(): Text {
        return this._text
    }
}