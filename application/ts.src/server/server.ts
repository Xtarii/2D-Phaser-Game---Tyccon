/**
 * Application Server
 */
import express from 'express'
import { Emitter, EventMap } from '../event/event'
import { route } from './routes/home'
import ServerSocket from './game/game'
import { Server as ColyseusServer } from 'colyseus'
import { WebSocketTransport } from '@colyseus/ws-transport'



/**
 * Server Instance
 */
export default class Server<T extends EventMap> {
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
     * Game Server Socket Instance
     *
     * Handles Game Backend data like player connections and
     * world build updates.
     */
    private udpServer: ColyseusServer



    /**
     * Creates Server Instance
     *
     * @param events Event System
     */
    constructor(events: Emitter<T>){
        this.PORT = Number.parseInt(process.env.PORT || "1024") // Server Port
        this.server = express() // Creates Server
        this.events = events    // Application Event System


        // Server Config
        this.server.set('view engine', 'pug')
        this.server.use(express.urlencoded({ extended: true }))
        this.server.use(express.static("public/"))


        // Routes
        this.server.use("/", route) // Home Route


        // Starts Server
        const socketEntry = this.server.listen(this.PORT, () => {
            console.log(`Starting Server ${this.PORT}...`) // DEBUG
        })



        // Game Server
        this.udpServer = new ColyseusServer({
            transport: new WebSocketTransport({
                server: socketEntry
            })
        })
        this.udpServer.define("main", ServerSocket)
    }
}
