/**
 * Base Application
 */

import { BrowserWindow } from "electron"
import { Emitter, EventEmitter, EventMap } from "./event/event"
import { ApplicationHost } from "./server/applicationHost"
import { Server } from "./server/networking/server"



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
     * Application Host Server
     *
     * Express Server for Page render
     * - Note: Server is Client Connections
     */
    static host: ApplicationHost<EventMap>
    /**
     * Game Server
     *
     * Handles Clients
     * - Note: Game Server is not the same as {@link host},
     * {@link server} is the networking backbone of the game
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
        // this.window.removeMenu()                            // Debug Menu Removal

        this.events = new EventEmitter()                       // Creates Event Handler
        Application.host = new ApplicationHost(this.events)    // Creates Host Server Instance
        Application.server = new Server(this.events)           // Creates Game Server Instance


        // Window Setup
        this.window.loadURL(`http://localhost:${Application.host.PORT}/`) // Loads Home Page
    }
}
