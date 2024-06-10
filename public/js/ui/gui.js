const { GameObjects } = require("phaser")



/**
 * UI Base Class
 *
 * All UI Components should Extend Upon this class
 * unless, if I ( Alvin ), decide to do my other UI
 * Component Builder Class
 */
export default class UI extends GameObjects.Image {
    /**
     * UI Placement Type
     *
     * Controls where on screen UI should be placed
     */
    static placementType = {
        /**
         * Placement Static ( default )
         *
         * Place UI Element after camera position
         * so UI element is always visible to camera
         */
        static: 0,
        /**
         * Placement Dynamic
         *
         * Place UI Element in World Position,
         * may not be in camera view
         */
        dynamic: 1
    }

    /**
     * List of all UI components
     */
    static UIComponents = []





    /**
     * Creates UI Object
     *
     * If Placement Type is ```null``` then placement is set
     * to static ( Camera )
     *
     * @param {Phaser.Scene} scene Scene
     * @param {number} x X Position
     * @param {number} y Y Position
     * @param {string} image UI Image
     * @param {number} frame Sprite Frame
     * @param {UI.placementType} placementType Placement Type
     */
    constructor(scene, x, y, image, frame, placementType){
        super(
            scene, // Scene

            (placementType === UI.placementType.static || placementType == null) ? scene.cameras.main.x + x : x,
            (placementType === UI.placementType.static || placementType == null) ? scene.cameras.main.y + y : y,

            // UI Image
            image,
            frame
        )

        // Sets Placement Type to Static
        this.placementType = placementType != null ? placementType : UI.placementType.static


        // Adds to Scene
        scene.add.existing(this)
        this.setDepth(101)
    }



    /**
     * Sets UI Component Placement Type
     *
     * @param {UI.placementType} type Placement Type
     */
    setPlacementType = (type) => {
        this.placementType = type
    }
}
