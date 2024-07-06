import { Component } from "../component"
import { getInteractableObjects } from "./Intractable"
import { Emitter, EventEmitter } from "@obesity-utils/main"



/**
 * Interaction Type
 */
type interaction = {
    /**
     * Target Getting Interacted with
     */
    target: Phaser.GameObjects.Sprite

    /**
     * Target Event Callback
     */
    callback: () => void

    /**
     * Target Distance
     */
    distance: number
}



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
    target: interaction | null = null

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
        "interaction": interaction
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
    constructor(parent: Phaser.GameObjects.Sprite, ...args: [number?]){
        super(parent)
        this._range = args[0] ?? parent.body?.gameObject.width // Set Search Range
        this.event = new EventEmitter() // Interaction Event Initialize
    }



    update = () => {
        // Checks for possible Interaction
        const interaction = this.checkInteraction(this._range)

        // If Interaction
        if(interaction && this.target) this.event.emit("interaction",
            {
                target: this.target.target,
                callback: this.target.callback,
                distance: this.target.distance
            }
        )
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

        // Checks if Interaction is possible
        if(closest)
            this.target = {
                target: closest.target,
                callback: closest.callback,
                distance: closest.distance
            } // Sets Target
        else this.target = null

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
    getClosestObject = (range?: number): interaction | null => {
        // Get Scene Objects
        const objects = getInteractableObjects()
        const closest: interaction[] = []

        // Checks all objects in scene after valid interaction
        for(var i in objects) {
            const body = objects[i].object // Gets Interactable Body

            // Gets Distance from parent
            const x1 = body.x, y1 = body.y // Object 1
            const x2 = this.parent.x, y2 = this.parent.y // Object 2 ( This )
            const distance = Math.sqrt(
                Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)
            )

            // Adds Object to Closest Object List if withing range
            if(distance < (range ?? distance + 1))
                closest.push({ target: objects[i].object, callback: objects[i].callback, distance })
        }

        // Sorts and returns closest object
        closest.sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0))
        return closest[0] ?? null
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
