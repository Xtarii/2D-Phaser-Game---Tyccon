/**
 * Application Server
 */
import { Emitter, EventMap } from '../event/event'
import ServerSocket from './game/game'
import { Server as ColyseusServer } from 'colyseus'



/**
 * Server Instance
 */
export default class Server<T extends EventMap> {
    /**
     * Server Port
     */
    public readonly PORT: number
    /**
     * Server Instance
     */
    private readonly server: ColyseusServer
    /**
     * Application Event System
     */
    private readonly events: Emitter<T>



    /**
     * Creates Server Instance
     *
     * @param events Event System
     */
    constructor(events: Emitter<T>){
        this.PORT = Number.parseInt(process.env.PORT || "1024") // Server Port

        this.server = new ColyseusServer()
        this.server.listen(this.PORT)
        this.server.define("main", ServerSocket) // Sets Server Room
        console.log("Game Server running : " + this.PORT) // DEBUG

        this.events = events    // Application Event System
    }
}
