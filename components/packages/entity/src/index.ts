import { Physics } from "phaser"
import { Component } from "@obesity-components/component"
import { styles } from "@obesity-components/gui"



/**
 * Entity Base Class
 */
export abstract class Entity extends Physics.Arcade.Sprite {
    /**
     * Entity Speed
     */
    speed: number = 75
    /**
     * Entity damp speed
     *
     * Damping Entity speed, to delay abrupt stop
    */
    dampSpeed: number = 0.7

    /**
     * Entity Name Bar
     */
    nameBar

    /**
     * Component List
     *
     * Holds all entity Components
     */
    private _components: Component[] = []



    /**
     * Creates Entity Instance
     *
     * - Creates Body
     * - Creates Name Display
     *
     * @param scene Game Scene
     * @param x X position
     * @param y Y position
     * @param spriteID Sprite ID
     * @param frame Sprite Frame
     * @param name Entity Name
     * @param depth Render Depth
     */
    constructor(scene: Phaser.Scene, x: number, y: number, spriteID: string, frame?: number, name?: string, depth?: number){
        super(scene, x, y, spriteID, frame) // Creates Entity

        // Adds to Scene
        scene.add.existing(this)
        scene.physics.add.existing(this)

        // Collider Setup
        const size = this.getBounds()
        const width = size.width / 3
        const height = size.height / 2

        this.body?.setSize((size.width - width), (size.height - height))
        this.body?.setOffset(width / 2, height)


        this.name = name ?? "" // Sets Name
        this.setDepth(depth ?? 0) // Sets Render Depth





        // WORK (IN/LE) PROCESS
        const nameDisplayConfig = {
            padding: {
                x: 50,
                y: 5
            },
            text: name,
            style: styles.ENTITY_NAMES
        }
        this.nameBar = scene.make.text(nameDisplayConfig)
        this.nameBar.setDepth(99)
        this.nameBar.setScale(0.13, 0.13)

        this.nameBar.x = this.x - (this.nameBar.displayWidth / 2) // X Position
        this.nameBar.y = this.y - (this.height - this.height / 4) // Y Position
    }



    update() {
        // Update Components
        const components = this.components
        for(var i in components) if(components[i].run) components[i].update() // Runs Update if component is active


        this.nameBar.x = this.x - (this.nameBar.displayWidth / 2)
        this.nameBar.y = this.y - (this.height - this.height / 4)
    }



    /**
     * Adds Component Instance to this Entity
     *
     * @param component Component
     * @param args Component argument
     * @returns Component Instance
     */
    readonly addComponent = <T extends Component>(component: new (parent: Phaser.GameObjects.GameObject, ...args: any[]) => T, ...args: any[]): T => {
        // Creates Component Instance
        const comp = new component(this, args)
        this._components.push(comp) // Adds to List
        comp.start() // Calls Component Start
        return comp // Returns Component Instance
    }

    /**
     * Removes Component Instance
     *
     * @param component Component Instance
     */
    readonly removeComponent = <T extends Component>(component: T) => {
        const newList: Component[] = [] // New Component List

        for(var i in this._components) {
            if(component === this._components[i]) {
                this._components[i].end() // Calls Component End
                delete this._components[i]
                continue
            }
            newList.push(this._components[i]) // Adds Component to New List
        }
        this._components = newList // Updates Old List
    }

    /**
     * Entity Components
     */
    get components(): Component[] { return [...this._components] }
}
