const {
    Button,
    TINT,
    PlacementType,

    Entity
} = require("@obesity/components")
const { sleep } = require("@obesity/utils")
import { Game } from "../../../game.js"



/**
 * Interaction Handler Component
 *
 * Handles Interaction for Player
 */
export default class InteractionHandler {
    /**
     * Interaction Object
     *
     * Holds Target and Interaction Indicator
     */
    interact = {
        /**
         * Interaction Target
         *
         * @type {Phaser.GameObjects.GameObject}
         */
        target: null,

        /**
         * Interaction Indicator
         *
         * UI Button for indicating a interaction
         *
         * @type {Button}
         */
        indicator: null
    }





    /**
     * Creates Interaction Handler Instance
     *
     * @param {Entity.BaseEntity} parent Parent
     */
    constructor(parent){
        this.parent = parent
    }



    /**
     * Handles Interactions
     *
     * Checks for Interactions. Creates, updates and ends
     * interaction objects
     *
     * @param {number} range Interaction Range
     */
    handleInteractions = (range) => {
        // Checks for interaction
        const interaction = this.checkInteraction(range)

        // Handles New Interaction
        if(interaction){
            if(!this.interact.indicator) this.#newInteraction() // New Interaction
            else this.#update() // Update Interaction

        // No Interaction
        }else{
            if(this.interact.indicator) this.#endInteraction() // End Interaction
        }
    }



    /**
     * Setup for new Interaction
     *
     * Creates Interact Button
     */
    #newInteraction = () => {
        const x = this.interact.target.x - ((this.interact.target.x - this.parent.x) / 32)
        const y = this.interact.target.y - ((this.interact.target.y - this.parent.y) / 32)

        // Creates Interact Button
        this.interact.indicator = new Button(
            this.parent.scene,

            x,
            y,

            "interact key",
            null,

            PlacementType.dynamic
        ) // Creates Button
    }

    /**
     * Ends Interaction
     *
     * Removes Interact Button
     */
    #endInteraction = () => {
        // Removes Interact Button
        this.interact.indicator.destroy()
        this.interact.indicator = null
    }

    /**
     * Interaction Update
     *
     * Updates if current Interaction
     */
    #update = () => {
        // Updates Interact Button
        this.interact.indicator.x = this.interact.target.x - ((this.interact.target.x - this.parent.x) / 32)
        this.interact.indicator.y = this.interact.target.y - ((this.interact.target.y - this.parent.y) / 32)


        /// TEST KEY DOWN DURATION - THIS WILL BE IN INTERACT OBJECT LATER
        this.interact.target.delay = 250


        // Checks for interaction Event
        if(this.parent.scene.input.keyboard.checkDown(this.parent.keys.E, this.interact.target.delay)){

            /// BUTTON TEST
            this.interact.indicator.setTint(TINT.NORMAL_TINT)
            sleep(3000).then(() => this.interact.indicator?.clearTint())

            // Call on Target Interact Function
        }
    }



    /**
     * Checks for Interaction Target
     *
     * If object is within distance, then {@link interact} target is set
     * to closest object.
     *
     * @param {number} range Max Distance
     * @returns Interaction Status
     */
    checkInteraction = (range) => {
        const object = this.getClosestObect(range) // Gets Closest Object
        this.interact.target = object.body // Sets Interact Target
        return this.interact.target != null // Return Interaction Status
    }



    /**
     * Get Closes Object
     *
     * Returns Closest GameObject to parent.
     *
     * @param {number} range Max Distance, if ```null``` no range is checked for
     * @returns Closest Object
     */
    getClosestObect = (range) => {
        // Find Objects In scene
        const objects = Game.scene.getScene("main").children.list
        const closest = []


        for(var i in objects){
            // Checks if Interactable
            if(objects[i].interactable == null || objects[i].interactable === false) continue


            // Gets Distance from parent
            const distance = Math.sqrt(
                Math.pow(objects[i].x - this.parent.x, 2) + Math.pow(objects[i].y - this.parent.y, 2)
            )

            // Adds Object to Closest Object List if withing range
            if(distance < (range || distance + 1)) closest.push({body: objects[i], distance})
        }

        // Sorts Closest Objects
        closest.sort((a, b) => a.distance - b.distance)
        return closest[0] || {body: null, distance: null} // Returns Closest Object
    }
}
