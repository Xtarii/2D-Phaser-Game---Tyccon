/**
 * Base Application
 */

import { BrowserWindow } from "electron"
import { Emitter, EventEmitter, EventMap } from "./event/event"
import Server from "./server/server"
import { readApplicationConfig } from "obesity-utils"



// Application Config Type
type DEV = {
    isDev?: boolean
    url?: string
}



/**
 * Base Application
 *
 * Stores Window Instance and other important
 * window related instances
 */
export class Application {
    /**
     * Application Events
     *
     * Handles event for Application
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
     * Application Server
     *
     * Handles Clients ( in game ) and
     * local page loading
     */
    static server: Server<EventMap>





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

        this.events = new EventEmitter()              // Creates Event Handler
        Application.server = new Server(this.events)  // Creates Host Server Instance

        try{
            // Reads Application Config
            const data = readApplicationConfig<DEV>("_dev.config")
            if(data.isDev) this.window.removeMenu() // Debug Menu Removal
            this.window.loadURL(data.url || `http://localhost:${Application.server.PORT}/`) // Loads Home Page

        }catch(err) {
            console.error(err) // DEBUG Error

            this.window.removeMenu() // Debug Menu Removal
            this.window.loadURL(`http://localhost:${Application.server.PORT}/`) // Loads Home Page
        }
    }
}
