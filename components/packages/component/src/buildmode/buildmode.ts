import { Emitter, EventEmitter } from "obesity-utils"
import { Component } from ".."



/**
 * Build Mode Component
 *
 * Should Only be given to player.
 * This Component Requires Player Input.
 */
export class BuildMode extends Component {
    /**
     * Event Handler
     */
    readonly event: Emitter<{
        "enter": []
        "exit": []
    }> = new EventEmitter()



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
        this.event.emit("enter") // Emits Enter Event

        // Build Mode Setup
        console.log("Enters Build Mode")
    }
    /**
     * Exit Build Mode
     *
     * Removes Build Environment
     * and sets up play mode.
     */
    private exit = () => {
        // Build Mode Exit
        console.log("Exits Build Mode")

        this.event.emit("exit") // Emits Exit Event
    }



    update = () => {
        // Build Mode Functionality
    }
}
