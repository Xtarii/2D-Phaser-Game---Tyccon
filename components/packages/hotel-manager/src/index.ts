import { Scene } from "phaser"
import { EventEmitter } from "obesity-utils"
import { ManagerUI } from "./menu/menu"



/**
 * Hotel Manager Object
 */
export class Manager {
    /**
     * Manager Parent Scene
     */
    private scene: Scene

    /**
     * Manager status
     *
     * If manager is in use then this is ```true```
     * otherwise this is ```false```
     */
    private _isOpen: boolean = false

    /**
     * Manager Event Handler
     */
    readonly events: EventEmitter<{
        open: [],
        close: []
    }>



    /**
     * Creates Manager Instance
     *
     * @param scene Scene
     */
    constructor(scene: Scene) {
        this.scene = scene // Sets Scene
        this.events = new EventEmitter() // Manager Event Handler
    }



    /**
     * Opens or Closes Manager
     *
     * If Manager is open then this will close the Manager
     * otherwise it will open the Manager.
     */
    manager() {
        // Open or Close Manager
        if(this.isOpen) this.close()
        else this.open()
    }
    /**
     * Opens Manager UI and Environment Setup
     */
    private open() {
        this._isOpen = true // Sets Status
        this.events.emit("open") // Calls Open Event

        ManagerUI.open(this.scene) // Opens UI
        ManagerUI.UICloseButton?.addButtonClickCallback(() => this.close())
    }
    /**
     * Closes Manager UI and Game Environment Setup
     */
    private close() {
        this._isOpen = false // Sets Status

        ManagerUI.close() // Closes UI

        this.events.emit("close") // Calls Close Event
    }





    /**
     * Manager status
     *
     * If manager is in use then this is ```true```
     * otherwise this is ```false```
     */
    get isOpen(): boolean { return this._isOpen }
}
