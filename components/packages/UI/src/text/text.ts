import { PlacementType, TINT, UI } from ".."



/**
 * Text Object Config Type
 */
export type TextConfig = {
    /**
     * Placement Type
     */
    placementType?: PlacementType


    /**
     * Text Object Padding
     */
    padding?: Phaser.Types.GameObjects.Text.TextPadding,
    /**
     * Text Object Style
     */
    style?: Phaser.Types.GameObjects.Text.TextStyle
}



/**
 * Text Style
 *
 * The Default text style for Text Objects
 */
export const style: Phaser.Types.GameObjects.Text.TextStyle = {
    fontSize: '10px',
    fontFamily: 'standard galactic',
    color: '#efefef',
    backgroundColor: '#2d2f2e5e',

    resolution: 2
}



/**
 * UI Text Object
 */
export class Text extends UI {
    protected object: Phaser.GameObjects.Text



    /**
     * Creates A Text Object
     *
     * @param scene Scene
     * @param x X Position
     * @param y Y Position
     * @param text Text
     * @param config Config
     */
    constructor(scene: Phaser.Scene, x: number, y: number, text?: string, config?: TextConfig) {
        super(scene, x, y, config?.placementType)


        // Text config
        const settings: Phaser.Types.GameObjects.Text.TextConfig = {
            padding: config?.padding ?? {
                x: 2,
                y: 2
            },
            text: text,
            style: config?.style ?? style
        }

        this.object = scene.make.text(settings) // Creates Text Instance

        this.object.setDepth(101) // Scene Depth ( Will be changed )
        if(this._placementType === PlacementType.static) this.object.setScrollFactor(0) // Sets to not move in Camera view

        // Sets Text Position
        this.object.x = this._x - this.object.displayWidth / 2
        this.object.y = this._y - this.object.displayHeight / 2
    }



    /**
     * Set UI Text
     *
     * Sets this objects render Text
     *
     * @param text Text String
     */
    setText = (text: string) => { this.object.setText(text) }

    /**
     * Sets Text Tint
     *
     * @param tint Text Tint
     */
    setTint = (tint: TINT) => { this.object.setTint(tint) }
    /**
     * Clears Text Tint
     */
    clearTint = () => { this.object.clearTint() }



    destroy() {
        super.destroy() // Calls UI Destroy
        this.object.destroy(true) // Removes UI Sprite Instance
    }





    set placementType(placementType: PlacementType) {
        // Updates UI Object Position Type
        if(placementType === PlacementType.static) this.object.setScrollFactor(0) // Makes it static
        if(placementType === PlacementType.dynamic) this.object.setScrollFactor(1) // Makes it movable

        super.placementType = placementType // UI Set Placement Type

        // Update Sprite Position
        this.object.x = this._x
        this.object.y = this._y
    }

    set x(x: number) {
        super.x = x
        this.object.x = this._x // Updates Sprite
    }
    set y(y: number) {
        super.y = y
        this.object.y = this._y // Updates Sprite
    }

    /**
     * Text Object Display width
     */
    get displayWidth(): number {
        return this.object.displayWidth
    }
    /**
     * Text Object Display height
     */
    get displayHeight(): number {
        return this.object.displayHeight
    }
}
