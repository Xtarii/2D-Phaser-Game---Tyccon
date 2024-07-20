/**
 * Base Application
 */

import { BrowserWindow } from "electron"
import { Emitter, EventEmitter, EventMap } from "./event/event"
import Server from "./server/server"
import { FileError, readApplicationConfig } from "obesity-utils"
import path from "path"



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
            if(!data.isDev) this.window.removeMenu() // Debug Menu Removal

            if(data.url) this.window.loadURL(data.url) // Loads Home Page
            else this.window.loadFile(path.join(__dirname, "../pages/index.html")) // Loads Home Page

        }catch(err) {
            console.error((err as FileError).message) // Converts to File Error

            this.window.removeMenu() // Debug Menu Removal
            this.window.loadFile(path.join(__dirname, "../pages/index.html")) // Loads Home Page
        }
    }
}
