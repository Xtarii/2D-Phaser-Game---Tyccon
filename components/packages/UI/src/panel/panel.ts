import { PlacementType, Text, UISprite } from ".."



/**
 * UI Panel
 *
 * A UI Object that can store multiple UI Objects.
 *
 * ```bash
 * Example:
 * - Button Instance
 *    ⊢ Image ( UI Object Instance )
 *    ↳ Text  (  UI Text Instance  )
 * ```
 */
export class Panel extends UISprite {
    /**
     * Object Container
     */
    private container: Phaser.GameObjects.Container



    /**
     * Creates a Panel Instance
     *
     * UI Object with background image,
     * other UI objects can be added in this Object.
     *
     * @param scene Scene
     * @param x X Position
     * @param y Y Position
     * @param image Image
     * @param frame Frame
     * @param placementType Placement Type
     */
    constructor(scene: Phaser.Scene, x: number, y: number, image: string, frame?: number, placementType?: PlacementType) {
        super(scene, x, y, image, frame, placementType) // Creates Instance

        // Creates Container
        this.container = scene.add.container(0, 0, this.sprite) // Creates Container at Object Position
        // if(this.placementType === PlacementType.static) this.container.setScrollFactor(0) // Sets to static

        this.container.setDepth(this.sprite.depth)
        this.sprite.setDepth(0) // Sets This Object as Panel Background
    }


    /**
     * Add UI Object to Panel
     *
     * @param object UI Object
     */
    add = (object: UISprite | Text) => {
        if(object instanceof UISprite)
            this.container.add(object.sprite) // Adds Sprite
        else this.container.add(object.body) // Adds Text
    }
    /**
     * Remove UI Object from Panel
     *
     * @param object UI Object
     */
    remove = (object: UISprite | Text) => {
        if(object instanceof UISprite)
            this.container.remove(object.sprite) // Removes Sprite
        else this.container.remove(object.body) // Removes Text
    }
}
