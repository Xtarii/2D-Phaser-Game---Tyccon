import { GameObjects } from "phaser"





/**
 * UI Placement Type
 *
 * All UI Objects has a placement type,
 * it helps to decide UI Object World Position.
 */
export enum PlacementType{
    /**
     * UI Object static type
     *
     * UI Objects with static is placed in camera view.
     * When the camera moves the UI Objects
     * stay in place. There world matrix is set to
     * be relative to camera.
     */
    static,

    /**
     * UI Object dynamic type
     *
     * UI Objects with dynamic is placed in world.
     * They do not move with the camera and they have
     * a world matrix. There position will be set to
     * a position in the world
     */
    dynamic,
}



/**
 * UI Base Class
 *
 * All UI Components should Extend Upon this class
 * unless, if I ( Alvin ), decide to do my other UI
 * Component Builder Class
 */
export default class UI extends GameObjects.Image {
    // UI Components List
    private static UIComponents: UI[] = []

    /**
     * Get a list of all UI Components
     *
     * @returns UI Components
     */
    public static getUIComponents = (): UI[] => [...this.UIComponents]
    /**
     * Adds UI Components to the Scene
     *
     * Stores them in a list [{@link getUIComponents}]
     *
     * @param UI UI Components
     */
    public static addUIComponents = (...UI: UI[]) => {
        this.UIComponents.push(...UI)

        // Adds To Scene
        for(var x in UI){
            UI[x].scene.add.existing(UI[x])
            UI[x].setDepth(101) // Scene Depth ( Will be changed )
        }
    }
    /**
     * Removes UI Object
     *
     * Removes UI object at index from list.
     * This also removes it from the scene.
     *
     * @param index UI Object Index
     */
    public static removeUIComponent = (index: number | string) => {
        const newList: UI[] = []

        // Checks UI Component list for index
        for(var i in this.UIComponents) {
            // Removes UI Object if Index matches
            if(i == index) {
                delete this.UIComponents[i]
                continue
            }

            // Adds Object to UI Component List
            newList.push(this.UIComponents[i])
        }
        this.UIComponents = newList // Updates UI Component List
    }
    /**
     * Removes UI Object
     *
     * Removes UI object from list.
     * This also removes it from the scene.
     *
     * This function removes the UI Object
     * from the list by checking if the
     * UI {@link object} provided as a param
     * matches with a object in the list.
     *
     * @param object UI Object
     */
    public static removeUIComponentObject = (object: UI) => {
        const newList: UI[] = []

        // Checks UI Component list for index
        for(var i in this.UIComponents) {
            // Removes UI Object if Index matches
            if(object === this.UIComponents[i]) {
                delete this.UIComponents[i]
                continue
            }

            // Adds Object to UI Component List
            newList.push(this.UIComponents[i])
        }
        this.UIComponents = newList // Updates UI Component List
    }





    /**
     * UI Placement Type
     */
    private _placementType: PlacementType



    /**
     * Creates UI Object Instance
     *
     * ```ts
     * // Default
     * placementType = static
     * ```
     *
     * Adds UI object to scene.
     *
     * @param scene Scene
     * @param x X Position
     * @param y Y Position
     * @param image UI Image
     * @param frame Image Frame
     * @param placementType Placement Type
     */
    constructor(scene: Phaser.Scene, x: number, y: number, image: string, frame?: number, placementType?: PlacementType){
        super(
            scene,

            x,
            y,

            image,
            frame
        )

        // Sets Object Placement Type
        this._placementType = placementType ? placementType : PlacementType.static
        if(this._placementType === PlacementType.static){
            this.setScrollFactor(0) // Sets to not move because of camera

            // Gets Canvas Position
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
        UI.addUIComponents(this) // Adds UI Object to Scene
    }



    destroy() {
        UI.removeUIComponentObject(this) // Removes From Scene
        super.destroy(true) // Destroys GameObject
    }





    /**
     * UI Object Placement Type
     */
    set placementType(placementType: PlacementType) {
        this._placementType = placementType

        // Updates UI Object Position Type
        if(placementType === PlacementType.static) this.setScrollFactor(0) // Makes it static
        if(placementType === PlacementType.dynamic) this.setScrollFactor(1) // Makes it movable

        // Updates Position to be relative to screen position
        if(placementType === PlacementType.dynamic){
            const camera = this.scene.cameras.main
            const x = this.x - (camera.width / 2 - camera.displayWidth / 2)
            const y = this.y - (camera.height / 2 - camera.displayHeight / 2)

            this.x = x + camera.worldView.x
            this.y = y + camera.worldView.y

        // Updates Position to be static on screen
        }else if(placementType === PlacementType.static){
            const camera = this.scene.cameras.main
            this.x = (camera.width / 2 - camera.displayWidth / 2) + this.x
            this.y = (camera.height / 2 - camera.displayHeight / 2) + this.y
        }
    }
    get placementType(): PlacementType { return this._placementType }
}
