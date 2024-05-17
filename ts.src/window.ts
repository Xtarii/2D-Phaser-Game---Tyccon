import { BrowserWindow } from "electron"
import { Emitter, EventEmitter } from "./event/event"



/**
 * Base Application
 *
 * Stores Window Instace and other important
 * window related instances
 */
export class Application {
    /**
     * Application Events
     *
     * Handels event for Application
     */
    public events: Emitter<{
        start: undefined
        end: undefined
    }>
    /**
     * Application Window Instance
     */
    public window: BrowserWindow





    /**
     * Creates Application Instance
     */
    constructor(){
        // Window Instance
        this.window = new BrowserWindow({
            width: 1500,
            height: 800,

            // Needed for Application Functions
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            },
        })
        // this.window.removeMenu() // Debug Menu Removal
        this.events = new EventEmitter() // Creates Event Handler
    }
}
