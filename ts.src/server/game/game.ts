import http from 'http'
import Socket from 'socket.io'



/**
 * Game Server Socket
 *
 * Handels Game Backend data like player connections and
 * world build updates.
 */
export class ServerSocket {
    /**
     * Server Instance
     */
    private server: Socket.Server
    /**
     * Clients List
     *
     * Record of all Connected Clients
     */
    public clients: Record<string, Socket.Socket>



    /**
     * Creates Game Server Instance
     *
     * @param server HTTP Server
     */
    constructor(server: http.Server) {
        this.server = new Socket.Server(server, {}) // Creates IO Socket Server
        this.clients = {}


        this.server.on("connection", socket => {
            console.log(`[ Server ] : ${socket.id} connected to the server`) // DEBUG
            this.clients[socket.id] = socket // Adds Client to Client List


            socket.broadcast.emit("joined", socket.id) // Sends Socket to all other players



            // Client Disconnection
            socket.on("disconnect", reason => {
                console.log(`[ Server ] : ${socket.id} left the Server --> [ ${reason} ]`)
            })
        })
    }
}
