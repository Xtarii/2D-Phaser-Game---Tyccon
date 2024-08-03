import { Button, Panel, TextButton, TINT } from "@obesity-components/gui"
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
    { name: "Home", tab: Home },
    { name: "Build", tab: Build }
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
    export const tabs: { tab: Tab.TabObject, button: Button }[] = []
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

        // Adds Tab and Button to Tab List
        tabs.push({ tab: tabInstance, button: createTabButton(scene, tab.name, tabInstance) })
    }

    /**
     * Creates a tab button
     *
     * On button click the tab instance is
     * selected as the Manager UI.
     *
     * @param scene Scene
     * @param name Tab Name
     * @param parent Tab Instance
     * @returns Button
     */
    function createTabButton(scene: Scene, name: string, parent: Tab.TabObject) {
        if(!UIBackground) throw new Error("No UI Background") // Error
        const button = new TextButton(name, scene, 0, 0, "interact key")
        button.sprite.setDisplaySize(Tab.tabSize.x, Tab.tabSize.y) // Sets Button Size

        const text = button.text // Needs to set button text values separate ( Don't know why yet )
        const x = (margin - Tab.tabSize.x / 4) + 5 + (Tab.tabSize.x * parent.id)
        const y = (margin - Tab.tabSize.y + 5)

        button.x = x
        button.y = y

        text.x = (x - text.displayWidth / 2) + 1 // This is only temporary because I want pictures
        text.y = y - text.displayHeight / 2

        // Custom Button Click Event
        button.sprite.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            // Button Response on Left Mouse Button Click
            if(pointer.leftButtonDown()) {
                button.sprite.setTint(TINT.NORMAL_TINT) // Changes Tint
                openTab(parent) // Opens Tab Instance
            }
        })
        UIBackground.add(button) // Adds Button
        return button // Returns Button
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
                tab.button.sprite.setTint(TINT.NORMAL_TINT) // Sets Tint
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
    function closeTab(tab: { tab: Tab.TabObject, button: Button }) {
        tab.tab.close() // Closes Tab
        tab.button.sprite.clearTint() // Clears Button Tint
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
