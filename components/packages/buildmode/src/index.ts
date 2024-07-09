import { Emitter, EventEmitter } from "obesity-utils"
import { Component } from "@obesity-components/component"
import { Panel } from "@obesity-components/gui"



/**
 * Build Mode Component
 *
 * Should Only be given to player.
 * This Component Requires Player Input.
 */
export class BuildMode extends Component {
    /**
     * Show Build Menu
     */
    private showMenu: boolean = false

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
        this.parent.scene.input.keyboard?.on("keydown-TAB", this.blockMenu)
    }
    /**
     * Exit Build Mode
     *
     * Removes Build Environment
     * and sets up play mode.
     */
    private exit = () => {
        // Build Mode Exit
        this.parent.scene.input.keyboard?.off("keydown-TAB", this.blockMenu)

        this.event.emit("exit") // Emits Exit Event
    }



    update = () => {
        // Build Mode Functionality
    }




    /**
     * Opens or Closes Block Menu
     */
    blockMenu = () => {
        const scene = this.parent.scene
        const camera = scene.cameras.main



        // Close Menu
        if(!this.showMenu){
            this.showMenu = true // Sets Menu to Close

            // Creates Menu
            this.menu = new Panel(scene, camera.displayWidth - 75, camera.displayHeight / 2, "player")
            this.menu.setDisplaySize(150, camera.displayHeight)

        // Open Menu
        }else {
            this.showMenu = false // Sets Menu to Open

            // Removes Menu
            this.menu?.destroy()
            this.menu = null
        }
    }

    menu: Panel | null = null
}
