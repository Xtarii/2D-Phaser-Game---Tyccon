import { Scene } from "phaser"
import { PlacementType, TINT, UISprite } from ".."



/**
 * UI Image Object
 *
 * An UI Image will not contain any extra
 * functions, it will just be an image on
 * the screen that is part of the
 * UI component Tree.
 */
export class Image extends UISprite {
    /**
     * Creates UI Image Instance
     *
     * @param args UI Args
     */
    constructor(...args: [Scene, number, number, string, (number | string)?, PlacementType?]) {
        super(args[0], args[1], args[2], args[3], args[4], args[5]) // Creates UI Sprite
    }



    /**
     * Sets Image Tint
     *
     * @param tint TINT
     */
    setTint = (tint: TINT | number) => { this.sprite.setTint(tint) }
    /**
     * Clears Image Tint
     */
    clearTint = () => { this.sprite.clearTint() }

    /**
     * Set Image Alpha
     *
     * @param alpha Alpha
     */
    setAlpha = (alpha: number) => { this.sprite.setAlpha(alpha) }
    /**
     * Clears Image Alpha
     */
    clearAlpha = () => { this.sprite.clearAlpha() }





    set x(x: number) { super.x = x }
    get x(): number { return this._x }

    set y(y: number) { super.y = y }
    get y(): number { return this._y }
}
