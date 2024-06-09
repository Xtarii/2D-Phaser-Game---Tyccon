import { Game } from "../../../game.js"
import Entity from "../entity.js"



/**
 * Interaction Handler Component
 *
 * Handles Interaction
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
         * @type {Phaser.GameObjects.GameObject}
         */
        indicator: null
    }





    /**
     * Creates Interaction Handler Instance
     *
     * @param {Entity} parent Parent
     */
    constructor(parent){
        this.parent = parent
    }



    /**
     * Checks for Interaction Target
     *
     * If object is within distance, then {@link interact} target is set
     * to closest object.
     *
     * @param {number} range Max Distance
     */
    checkInteraction = (range) => {
        const object = this.getClosestObect(this.parent, range) // Gets Closest Object
        this.interact.target = object.body // Sets Interact Target
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
            if(objects[i].interactable === (null || undefined) || objects[i].interactable === false) continue


            // Gets Distance from parent
            const distance = Math.sqrt(
                Math.pow(objects[i].x - this.parent.x, 2) + Math.pow(objects[i].y - this.parent.y, 2)
            )

            // Adds Object to Closest Object List if withing range
            if(distance < (range || distance + 1)) closest.push({body: objects[i], distance})
        }

        // Return Closest Object
        closest.sort((a, b) => a.distance - b.distance)
        return closest[0] || null // Returns Closest Object or Null ( I don't like undefined )
    }
}
