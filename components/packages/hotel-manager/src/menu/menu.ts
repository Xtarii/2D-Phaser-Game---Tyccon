import { Button, Image, Panel, TextButton, TINT } from "@obesity-components/gui"
import { Scene } from "phaser"
import { Tab } from "./tab"
import Build from "./tabs/build"
import Home from "./tabs/home"



/**
 * Manager Tabs List
 *
 * Tabs that should be in the Manager
 * tab list as instances.
 */
const tabsList: Tab.Tab[] = [
    { tab: Home, icon: "Tab Buttons: Home" },
    { tab: Build, icon: "Tab buttons: Build" }
]

/**
 * UI Margin
 *
 * The amount of pixels from the
 * edge of the screen to be
 * positioned at.
 */
export const margin: number = 75

/**
 * UI Size Collection
 */
export const UISizes = {
    /**
     * Tab Button Size
     *
     * From {@link Tab.tabSize}
     */
    tabButton: Tab.tabSize,
    /**
     * Tab Button Icon Size
     *
     * From {@link Tab.tabIconSize}
     */
    tabIcon: Tab.tabIconSize,


    /**
     * Room Button Size
     */
    roomButton: {
        x: 100,
        y: 25
    },
    /**
     * Room Icon Size
     */
    roomIcon: {
        x: 16,
        y: 16
    }
}



/**
 * Manager UI Scene
 */
export namespace ManagerUI {
    /**
     * Manager UI Background
     */
    let UIBackground: Panel | null
    /**
     * Manager UI Close Button
     */
    export let UICloseButton: Button | null
    /**
     * Tab List
     *
     * List of Tab Instances in Manager
     * ```
     * tab: TabObject
     * button: Button
     * ```
     */
    export const tabs: { tab: Tab.TabObject, button: { button: Button, image: Image } }[] = []
    /**
     * Current Tab ID
     *
     * The ID of the currently opened Tab
     */
    let currentTabID: number



    /**
     * Opens Manager UI
     *
     * @param scene Scene
     */
    export function open(scene: Scene) {
        const camera = scene.cameras.main // Scene Camera ( Main )

        // UI Background
        UIBackground = new Panel(
            scene, camera.displayWidth / 2, camera.displayHeight / 2, "hotel-manager background")
        UIBackground.sprite.setDisplaySize(camera.displayWidth - margin, camera.displayHeight - margin)

        // UI Close Button
        UICloseButton = new Button(scene, 0, 0, "interact key")
        UIBackground.add(UICloseButton) // Adds Close Button
        UICloseButton.x = UIBackground.sprite.displayWidth + UICloseButton.sprite.displayWidth
        UICloseButton.y = margin - UICloseButton.sprite.displayHeight


        // UI Tab Setup
        for(const tab of tabsList) createTab(tab, scene) // Creates Tab
        openTab(tabs[0].tab) // Opens Home ( Home is always 0 )
    }



    /**
     * Creates a Tab Instance
     *
     * Adds a tab button to the Manager UI.
     *
     * @param tab Tab
     * @param scene Scene
     */
    function createTab(tab: Tab.Tab, scene: Scene) {
        if(!UIBackground) throw new Error("No UI Background") // Error
        const tabInstance = new tab.tab(UIBackground, tabs.length) // Tab Object
        const button = createTabButton(scene, tab.icon, tabInstance) // Creates Button

        // Custom Button Click Event
        button.button.sprite.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            // Button Response on Left Mouse Button Click
            if(pointer.leftButtonDown()) {
                button.button.sprite.setTint(TINT.NORMAL_TINT) // Changes Tint
                button.image.setTint(TINT.NORMAL_TINT) // Button Icon

                openTab(tabInstance) // Opens Tab Instance
            }
        })
        UIBackground.add(button.button) // Adds Button
        UIBackground.add(button.image) // Adds Icon
        tabs.push({ tab: tabInstance, button: button }) // Adds Tab and Button to Tab List
    }

    /**
     * Creates a tab button
     *
     * On button click the tab instance is
     * selected as the Manager UI.
     *
     * @param scene Scene
     * @param icon Tab Icon
     * @param parent Tab Instance
     * @returns Button
     */
    function createTabButton(scene: Scene, icon: string, parent: Tab.TabObject) : { button: Button, image: Image } {
        if(!UIBackground) throw new Error("No UI Background") // Error
        const button = new Button(scene, 0, 0, "Tab Button")
        button.sprite.setDisplaySize(UISizes.tabButton.x, UISizes.tabButton.y) // Sets Button Size

        const x = (margin - UISizes.tabButton.x / 4) + 5 + (UISizes.tabButton.x * parent.id)
        const y = (margin - UISizes.tabButton.y + 5)
        button.x = x
        button.y = y
        const image = createTabButtonIcon(scene, x, y, icon) // Creates Icon
        return { button, image } // Returns Button
    }

    /**
     * Creates Icon Image for Tab Button
     *
     * @param scene Scene
     * @param x X Position
     * @param y Y Position
     * @param icon Tab Icon
     * @returns Icon Image
     */
    function createTabButtonIcon(scene: Scene, x: number, y: number, icon: string) : Image {
        const image = new Image(scene, x, y, icon)
        image.sprite.setDisplaySize(UISizes.tabIcon.x, UISizes.tabIcon.y) // Image Size
        return image
    }



    /**
     * Opens Tab
     *
     * The passed tab instance gets
     * opened and other tabs
     * gets closed.
     *
     * ```ts
     * tab.open() // Opens Tab
     * ```
     *
     * @param tabInstance Tab Instance
     */
    function openTab(tabInstance: Tab.TabObject) {
        for(const tab of tabs) {
            if(tabInstance !== tab.tab) closeTab(tab) // Closes The Tab
            else {
                tab.button.button.sprite.setTint(TINT.NORMAL_TINT) // Sets Tint
                if(currentTabID !== tab.tab.id) tab.tab.open() // Opens Tab
            }
        }
        currentTabID = tabInstance.id // Sets Currently Opened Tab ID
    }

    /**
     * Closes Tab
     *
     * The Tab gets closed and the Button
     * is cleared of any tint.
     *
     * @param tab Tab
     */
    function closeTab(tab: { tab: Tab.TabObject, button: { button: Button, image: Image } }) {
        tab.tab.close() // Closes Tab
        tab.button.button.sprite.clearTint() // Clears Button Tint
        tab.button.image.clearTint() // Clears Button Icon Tint
    }



    /**
     * Closes The Manager UI
     */
    export function close() {
        // Tabs Close
        for(const tab of tabs) closeTab(tab) // Closes Tabs
        tabs.length = 0 // Clears List

        // Removes UI Background
        UIBackground?.destroy()
        UIBackground = null
    }
}
