import { Component } from ".."



/**
 * Build Mode Component
 *
 * Should Only be given to player.
 * This Component Requires Player Input.
 */
export class BuildMode extends Component {
    /**
     * Enters or Exits Build Mode
     *
     * Auto Checks after build mode status,
     * if build mode is entered then this will
     * exit build mode else enter.
     */
    buildMode = () => {
        // Exits Build Mode
        if(this.run) {
            this.exit()
            this.run = false
            return
        }

        // Enters Build Mode
        this.enter()
        this.run = true
    }

    /**
     * Enter Build Mode
     *
     * Removes play mode Environment
     * and sets up Build Mode
     */
    private enter = () => {
        console.log("Enters Build Mode")
    }
    /**
     * Exit Build Mode
     *
     * Removes Build Environment
     * and sets up play mode.
     */
    private exit = () => {
        console.log("Exits Build Mode")
    }



    update = () => {
        // Build Mode Functionality
    }
}
