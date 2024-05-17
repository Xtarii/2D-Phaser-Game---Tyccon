/**
 * Game Server
 *
 * Multiplayer Server, handles
 * client calls and updates
 */

import { Emitter, EventMap } from "../../event/event";



/**
 * Game Server Instance
 */
export class Server<T extends EventMap> {
    /**
     * Server Port
     */
    public PORT: number
    /**
     * Server Instance
     */
    private server
    /**
     * Application Event System
     */
    private events: Emitter<T>




    /**
     * Creates Game Server Instance
     *
     * @param events Event System
     */
    constructor(events: Emitter<T>){
        this.PORT = 8081 // Server Port
        this.server = "Server"
        this.events = events // Server Event Handler
    }
}
