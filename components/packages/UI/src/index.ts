import Phaser from "phaser"



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
 * All UI Objects are built and managed
 * by this UI class, but new UI should
 * not extend upton this class.
 * This class is the bone of the UI Components,
 * new UI should use {@link UISprite}
 */
export abstract class UI {
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
    public static addUIComponents = (...UI: UI[]) => { this.UIComponents.push(...UI) }
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
    protected _placementType: PlacementType

    /**
     * UI Body
     *
     * Only contains the UI Body Objects.
     * If UI is body-less then this will be empty.
     *
     * Helps the Scene and others UI objects to
     * add all the UI body parts.
     */
    protected _body: Phaser.GameObjects.GameObject[] = []

    /**
     * UI Object Scene
     *
     * The scene that this UI Object is in
     */
    scene: Phaser.Scene
    /**
     * X Position
     */
    protected _x: number
    /**
     * Y Position
     */
    protected _y: number



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
     * @param placementType Placement Type
     */
    constructor(scene: Phaser.Scene, x: number, y: number, placementType?: PlacementType){
        this.scene = scene
        this._x = x
        this._y = y

        // Sets Object Placement Type
        this._placementType = placementType ?? PlacementType.static
        if(this._placementType === PlacementType.static){
            // Gets Canvas Position
            const camera = scene.cameras.main

            /// 800 pixel Canvas
            /// 1.7 camera zoom
            ///
            /// 800 / 1.7 = Pixels in Canvas
            /// ============================
            ///         470.5882353

            this._x = (camera.width / 2 - camera.displayWidth / 2) + x
            this._y = (camera.height / 2 - camera.displayHeight / 2) + y
        }
        UI.addUIComponents(this) // Adds UI Object to Scene
    }



    /**
     * Update
     *
     * This function will update this UI object.
     * It gets called in Scene Update
     */
    update() {}
    /**
     * Destroys this UI Object
     */
    destroy() {
        UI.removeUIComponentObject(this) // Removes From Scene
        for(var x in this.body) this.body[x].destroy(true) // Destroys Body Elements
    }





    /**
     * UI Object Placement Type
     */
    set placementType(placementType: PlacementType) {
        this._placementType = placementType

        // Updates Position to be relative to screen position
        if(placementType === PlacementType.dynamic){
            const camera = this.scene.cameras.main
            const x = this._x - (camera.width / 2 - camera.displayWidth / 2)
            const y = this._y - (camera.height / 2 - camera.displayHeight / 2)

            this._x = x + camera.worldView.x
            this._y = y + camera.worldView.y

        // Updates Position to be static on screen
        }else if(placementType === PlacementType.static){
            const camera = this.scene.cameras.main
            const relX = (this._x - camera.worldView.x)
            const relY = (this._y - camera.worldView.y)

            this._x = (camera.width / 2 - camera.displayWidth / 2) + relX
            this._y = (camera.height / 2 - camera.displayHeight / 2) + relY
        }
    }
    get placementType(): PlacementType { return this._placementType }

    /**
     * UI Object X Position
     */
    set x(x: number) {
        const camera = this.scene.cameras.main

        // Calculates Position relative to camera ( static )
        if(this._placementType === PlacementType.static)
            this._x = (camera.width / 2 - camera.displayWidth / 2) + x
        else this._x = x // Dynamic Position
    }
    get x(): number { return this._x }
    /**
     * UI Object Y Position
     */
    set y(y: number) {
        const camera = this.scene.cameras.main

        // Calculates Position relative to camera ( static )
        if(this._placementType === PlacementType.static)
            this._y = (camera.height / 2 - camera.displayHeight / 2) + y
        else this._y = y // Dynamic Position
    }
    get y(): number { return this._y }

    /**
     * UI Body List
     *
     * A list of all the UI component
     * underlying parts.
     *
     * This may be empty but never ```null```,
     * the amount of objects depends on
     * the UI object.
     */
    get body(): Phaser.GameObjects.GameObject[] {
        return this._body
    }
}

/**
 * UI Sprite Component
 *
 * All UI Objects that have a image or sprite
 * as there body should extend upon this class.
 */
export abstract class UISprite extends UI {
    /**
     * UI Sprite Object
     */
    sprite: Phaser.GameObjects.Sprite



    /**
     * Creates new UI Sprite Object
     *
     * @param scene Scene
     * @param x X Position
     * @param y Y Position
     * @param image Image ID
     * @param frame Frame
     * @param placementType Placement Type
     */
    constructor(scene: Phaser.Scene, x: number, y: number, image: string, frame?: number | string, placementType?: PlacementType) {
        super(scene, x, y, placementType)
        this.sprite = scene.add.sprite(this._x, this._y, image, frame) // Creates UI Sprite
        this._body.push(this.sprite) // Adds sprite to Body

        // Sprite Config
        this.sprite.setDepth(101) // Scene Depth ( Will be changed )
        if(this._placementType === PlacementType.static) this.sprite.setScrollFactor(0) // Sets to not move in Camera view
    }





    set placementType(placementType: PlacementType) {
        // Updates UI Object Position Type
        if(placementType === PlacementType.static) this.sprite.setScrollFactor(0) // Makes it static
        if(placementType === PlacementType.dynamic) this.sprite.setScrollFactor(1) // Makes it movable

        super.placementType = placementType // UI Set Placement Type

        // Update Sprite Position
        this.sprite.x = this._x
        this.sprite.y = this._y
    }

    set x(x: number) {
        super.x = x
        this.sprite.x = this._x // Updates Sprite
    }
    get x(): number { return super.x }
    set y(y: number) {
        super.y = y
        this.sprite.y = this._y // Updates Sprite
    }
    get y(): number { return super.y }
}





// Library Exports
export * from "./button/button"
export * from "./button/textButton"

export * from "./panel/panel"
export * from "./text/text"
export * from "./text/styles"
export * from "./image/image"
