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
    static addUIComponents = (...items) => { this.#UIComponents.push(...items) }
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
     * Updates All Registerd UI Components from Component List
     *
     * Loops through every UI component and calls Update on it
     */
    static updateAll = () => {
        const uis = this.getUIComponents() // Gets Copy of UI list to avoid Errors
        for(var x in uis) uis[x].update() // Updates UI Component
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

            // Position
            x,
            y,

            // UI Image
            image,
            frame
        )

        // Sets Placement Type to Static
        this.#placementType = placementType != null ? placementType : UI.placementType.static
        if(this.#placementType === UI.placementType.static){
            this.setScrollFactor(0) // Sets Scroll Factor to 0, object won't move with camera

            // Sets Canvas Position
            const camera = scene.cameras.main

            /// 800 pixel Canvas
            /// 1.7 camera zoom
            ///
            /// 800 / 1.7 = Pixels in Canvas
            /// ============================
            ///         470.5882353

            this.x = (camera.width / 2 - camera.displayWidth / 2) + x
            this.y = (camera.height / 2 - camera.displayHeight / 2) + y
        }
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


    destroy(){
        UI.removeUIComponent(this) // Remove This from UI List
        super.destroy(true) // Destroy This UI Object
    }
}
