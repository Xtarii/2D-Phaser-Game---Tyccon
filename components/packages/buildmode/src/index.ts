import { Emitter, EventEmitter } from "obesity-utils"
import { Component } from "@obesity-components/component"

import { BuildMenu } from "./ui/menu"
import { BuildBlock } from "./ui/block"



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

        BuildBlock.show(this.parent.scene, BuildMenu.block.spriteID) // Show Block

        // Build Mode Setup
        this.parent.scene.input.keyboard?.on("keydown-TAB", this.menu)
    }
    /**
     * Exit Build Mode
     *
     * Removes Build Environment
     * and sets up play mode.
     */
    private exit = () => {
        // Build Mode Exit
        this.parent.scene.input.keyboard?.off("keydown-TAB", this.menu)

        BuildMenu.close() // Closes Menu if Open
        BuildBlock.hide() // Hides Build Block

        this.event.emit("exit") // Emits Exit Event
    }



    update = () => {
        const scene = this.parent.scene // Scene
        const mouse = scene.input.activePointer // Gets Mouse Object

        // Block Position
        //
        // Grid System
        // -----------
        // (spriteSize / mouseX).round() * spriteSize
        // (SpriteSize / mouseY).round() * spriteSize
        // ============================================
        // mouse position = x < 64, y < 64
        // Then Grid Position = 1, 1
        //
        // Position is half of spriteSize * grid position
        // SpriteSize is 64 pixels, that is the amount of pixels
        // this game uses for the sprites and tiles.
        const gridPosX = Math.round((mouse.worldX + 32) / 64)
        const gridPosY = Math.round((mouse.worldY + 32) / 64)

        // Grid (Position * SpriteSize) - Block.Size / 2 = Center of Grid Position
        const x = (gridPosX * 64) - (BuildBlock.width() ?? 0) / 2
        const y = (gridPosY * 64) - (BuildBlock.height() ?? 0) / 2

        BuildBlock.setPosition(x, y) // Updates Block Position
    }




    /**
     * Opens or Closes Block Menu
     */
    menu = () => {
        const scene = this.parent.scene



        // Close Menu
        if(!BuildMenu.isShowing){
            // Creates Menu
            BuildMenu.show(scene) // Shows Menu

            // Removes Current Build Block
            BuildBlock.hide()

        // Open Menu
        }else {
            // Removes Menu
            BuildMenu.close()

            // Set Current Build Block
            BuildBlock.show(scene, BuildMenu.block.spriteID)
        }
    }
}
