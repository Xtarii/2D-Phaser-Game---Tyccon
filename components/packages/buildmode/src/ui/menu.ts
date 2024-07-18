import { Button, Panel } from "@obesity-components/gui"
import { Scene } from "phaser"



/**
 * Build Menu Namespace
 */
export namespace BuildMenu {
    /**
     * Menu UI
     */
    let menu: Panel | null

    /**
     * Menu Show Status
     *
     * True if menu is shown otherwise false
     */
    export let isShowing: boolean = false

    /**
     * Currently Selected Build Block
     *
     * Holds Block Data
     * - Sprite ID
     */
    export let block: {spriteID: string} = {
        spriteID: "player"
    }



    /**
     * Show Menu
     *
     * Shows Menu on Scene
     *
     * @param scene Scene
     */
    export function show(scene: Scene) {
        const camera = scene.cameras.main
        isShowing = true // Set Menu Show Status

        // Menu UI
        menu = new Panel(scene, camera.displayWidth / 2, camera.displayHeight / 2, "build menu - panel")
        menu.sprite.setDisplaySize(camera.displayWidth - 50, camera.displayHeight - 50)
    }

    /**
     * Close Menu Function
     */
    export function close() {
        isShowing = false // Set Menu Show Status

        // Hides Menu ( Kaboom, gone )
        menu?.destroy()
        menu = null
    }


    function createButton(scene: Scene) {
        // Test Button 1
        menu?.add(new Button("Test", scene, 100, 100, "interact key"))

        // Test Button 2
    }
}
