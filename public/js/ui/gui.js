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
     *
     * @type {UI[]}
     */
    static #UIComponents = []
    /**
     * Get UI Components
     *
     * @returns List of UI Components
     */
    static getUIComponents = () => [...this.#UIComponents]
    /**
     * Add UI(s) to UI Component List
     *
     * @param  {...UI} items UI Items
     */
    static addUIComponents = (...items) => { this.#UIComponents.push(items) }
    /**
     * Removes UI Item at Index from UI Component List
     *
     * @param {number | string} index Index
     */
    static removeUIComponent = (index) => {
        const list = []

        // Looks for Index
        for(var i in this.#UIComponents){
            if(i == index){
                delete this.#UIComponents[i]
                continue
            }

            // Adds Object to new List
            list.push(this.#UIComponents[i])
        }

        this.#UIComponents = list // Overwrites UI Component List
    }





    /**
     * UI Placement Type
     */
    #placementType





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
        this.#placementType = placementType != null ? placementType : UI.placementType.static
        UI.addUIComponents(this) // Adds To Referance List


        // Adds to Scene
        scene.add.existing(this)
        this.setDepth(101)
    }



    /**
     * Sets UI Component Placement Type
     *
     * @param {UI.placementType} type Placement Type
     */
    setPlacementType = (type) => this.#placementType = type


    destroy = () => {
        UI.removeUIComponent(this) // Remove This from UI List
        super.destroy(true) // Destroy This UI Object
    }
}
