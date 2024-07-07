import { Component } from ".."



/**
 * Build Mode Component
 *
 * Should Only be given to player.
 * This Component Requires Player Input.
 */
export class BuildMode extends Component {
    /**
     * Enter Build Mode
     *
     * This will setup the build environment.
     * Can only run if build mode is ```off```.
     */
    enter = () => {
        if(this.run) return // Exits if build mode is already active
        this.run = true // Starts Build Mode


        console.log("Enters Build Mode")
    }
    /**
     * Exit Build Mode
     *
     * This will exit and remove build environment.
     * Can only run if build mode is ```on```.
     */
    exit = () => {
        if(!this.run) return // Exits if build mode is already inactive
        this.run = false // Ends Build Mode


        console.log("Exits Build Mode")
    }



    update = () => {
        // Build Mode Functionality
    }
}
