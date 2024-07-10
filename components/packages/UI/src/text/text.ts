import { PlacementType, UI } from ".."



/**
 * Text Object Config Type
 */
type TextConfig = {
    /**
     * Placement Type
     */
    placementType?: PlacementType

    /**
     * Text Object Padding
     */
    padding?: {
        x: number
        y: number
    }
}



/**
 * UI Text Object
 */
export class Text extends UI {
    /**
     * Creates A Text Object
     *
     * @param scene Scene
     * @param x X Position
     * @param y Y Position
     * @param text Text
     * @param config Config
     */
    constructor(scene: Phaser.Scene, x: number, y: number, text: string, config?: TextConfig) {
        super(scene, x, y, config?.placementType)
        // Text Style
        const style = {
            fontSize: '50px',
            fontFamily: 'Arial',
            color: '#cfcfcf',
            backgroundColor: '#2d2f2e5e'
        }

        // Text config
        const settings = {
            padding: config?.padding ?? {
                x: 50,
                y: 5
            },
            text: text,
            style: style
        }

        const object = scene.make.text(settings)
        object.x = this._x; object.y = this._y // Sets Text Position
    }
}
