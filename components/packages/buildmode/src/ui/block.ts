import { Image, PlacementType } from "@obesity-components/gui"
import { Scene } from "phaser"



/**
 * Build Block Namespace
 */
export namespace BuildBlock {
    /**
     * Block Instance
     *
     * The Block to Place
     */
    let block: Image | null



    /**
     * Shows Block Image on Scene
     *
     * Creates UI Image showing a
     * preview of the block.
     *
     * @param scene Scene
     * @param spriteID Sprite ID
     */
    export function show(scene: Scene, spriteID: string) {
        const mouse = scene.input.activePointer // Mouse Object

        const x = mouse.worldX, y = mouse.worldY // Block Position

        // Creates Block
        block = new Image(scene, x, y, spriteID, undefined, PlacementType.dynamic)
    }

    /**
     * Hide Block
     *
     * Removes Block from Scene
     */
    export function hide() {
        // Removes Block
        block?.destroy()
        block = null
    }



    /**
     * Set Block Position
     *
     * If no block exists then nothing will happen.
     *
     * @param x X Position
     * @param y Y Position
     */
    export function setPosition(x: number, y: number) {
        if(!block) return // Returns if No Block

        // Set Block Position
        block.x = x
        block.y = y
    }



    /**
     * Block Display Width
     */
    export const width = () => block?.sprite.displayWidth
    /**
     * Block Display Height
     */
    export const height = () => block?.sprite.displayHeight
}
