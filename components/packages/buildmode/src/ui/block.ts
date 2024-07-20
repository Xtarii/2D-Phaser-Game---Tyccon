import { Image, PlacementType } from "@obesity-components/gui"
import { Scene } from "phaser"



/**
 * Block Error Class
 */
export class BlockError extends Error {}



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
     * Block Placement Status
     *
     * If true, then the block can
     * be placed if false the block
     * can not be placed.
     */
    export let canPlace = true



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
        setBlueTint() // Sets Blue Tint ( Needs to be Updated )
        block.setAlpha(0.5) // Sets Block Alpha

        canPlace = true // Can place block
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

        canPlace = false // Can't place block
    }



    /**
     * Set Block Position
     *
     * If no block exists then nothing will happen.
     *
     * @param x X Position
     * @param y Y Position
     *
     * @throws Block Error if no block is available
     */
    export function setPosition(x: number, y: number) {
        if(!block) throw new BlockError("No Block is available") // Error

        // Set Block Position
        block.x = x
        block.y = y
    }



    /**
     * Place block to Scene
     *
     * Places current block into scene.
     * If it can't be placed an Error will
     * be thrown.
     *
     * @param scene Scene
     */
    export function place(scene: Scene) {
        if(!canPlace) throw new BlockError("Can't Place Block") // Error, Can't place block
        if(!block) throw new BlockError("There is no block to place") // Error, no block is selected




        // Temporary Placement of Objects
        const b = scene.add.sprite(block.x, block.y, block.sprite.texture)
        b.setDepth(20)
    }



    /**
     * Set Block tint to Blue
     *
     * This will represent that the block can be placed.
     * If the block can be placed, that is if there is no
     * objects in the way and the block is within bounds
     * of the world then the color can be set to blue to
     * represent that.
     *
     * @throws Block Error if no block is available
     */
    export function setBlueTint() {
        if(!block) throw new BlockError("No Block is available") // Error
        block.setTint(0x00a0ff) // Sets Block Tint ot Blue
    }

    /**
     * Set Block tint to Red
     *
     * This will represent that the block can't be placed.
     * If the block is over a area where it should not be
     * then the color can be set to red to represent that.
     *
     * @throws Block Error if no block is available
     */
    export function setRedTint() {
        if(!block) throw new BlockError("No Block is available") // Error
        block.setTint(0xff3000) // Sets Block Tint ot Blue
    }



    /**
     * Block Display Width
     */
    export const width = () => block?.sprite.displayWidth
    /**
     * Block Display Height
     */
    export const height = () => block?.sprite.displayHeight

    /**
     * Block Status
     *
     * True if block is showing
     * and false if block is hidden.
     */
    export const isShowing = () => block != null
}
