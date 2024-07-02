import { Physics } from "phaser"
import { Component } from "../component"
import { Intractable } from "./Intractable"
import { Emitter, EventEmitter } from "@obesity/utils"



/**
 * Interaction Component
 */
export class Interact extends Component {
    /**
     * Interaction Target
     *
     * Current Target that this parent
     * is interacting with
     */
    target: Phaser.GameObjects.GameObject | null = null

    /**
     * Search range
     *
     * The range to automatically use for
     * interaction target search.
     */
    private _range: number

    /**
     * Event Handler
     */
    readonly event: Emitter<{
        /**
         * Interaction Start and Update Event
         */
        "interaction": Phaser.GameObjects.GameObject | null
        /**
         * Interaction End Event
         */
        "no interaction": undefined
    }>



    /**
     * Creates Interact Component Instance
     *
     * @param parent Component Parent
     * @param args Interact Args
     */
    constructor(parent: Phaser.GameObjects.GameObject, ...args: [number?]){
        super(parent)
        this._range = args[0] ?? parent.body?.gameObject.width // Set Search Range
        this.event = new EventEmitter() // Interaction Event Initialize
    }



    update = () => {
        // Checks for possible Interaction
        const interaction = this.checkInteraction(this._range)

        // If Interaction
        if(interaction) this.event.emit("interaction", this.target)
        else this.event.emit("no interaction", undefined)
    }



    /**
     * Checks if Parent has any interactions available
     *
     * If parent can interact with a target
     * this function will return true else false.
     *
     * Searches for target withing range or
     * infinite if no range is specified.
     *
     * @param range Search Range
     * @returns Interaction Status
     */
    checkInteraction = (range?: number): boolean => {
        const closest = this.getClosestObject(range)
        this.target = closest.body // Sets Target
        return this.target != null // Returns Interaction Status
    }

    /**
     * Gets Closest Object relative to parent
     *
     * If no range is specified, ```infinitive```
     * will be used as range.
     *
     * @param range Search Range
     * @returns Closest Object
     */
    getClosestObject = (range?: number): { body: Phaser.GameObjects.GameObject | null, distance: number | null } => {
        // Get Scene Objects
        const objects = this.parent.scene.children.list
        const closest: { body: Phaser.GameObjects.GameObject | null, distance: number | null }[] = []


        // Checks all objects in scene after valid interaction
        for(var i in objects) {
            // Checks if object is intractable
            if(!(objects[i] as unknown as Intractable).interact) continue


            // Gets Distance from parent
            const x1 = objects[i].body?.position.x, y1 = objects[i].body?.position.y // Object 1
            const x2 = this.parent.body?.position.x, y2 = this.parent.body?.position.y // Object 2 ( This )
            if(!x1 || !y1 || !x2 || !y2) continue // Returns if no Position was found

            const distance = Math.sqrt(
                Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)
            )

            // Adds Object to Closest Object List if withing range
            if(distance < (range ?? distance + 1)) closest.push({ body: objects[i], distance })
        }

        // Sorts and returns closest object
        closest.sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0))
        return closest[0] ?? { body: null, distance: null }
    }





    /**
     * Search range
     *
     * The range to automatically use for
     * interaction target search.
     */
    set range(range: number) { this._range = range }
    get range(): number { return this._range }
}
