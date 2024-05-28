import http from 'http'
import Socket from 'socket.io'



/**
 * Client Interface
 */
interface Client {
    /**
     * Client ID
     */
    id: string

    /**
     * Client Position
     */
    position : {
        x: number
        y: number
    }
}

interface PlayerData {
    /**
     * Player X Position
     */
    x: number
    /**
     * Player Y Position
     */
    y: number
}





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
    public clients: { [key: string]: Client }



    /**
     * Creates Game Server Instance
     *
     * @param server HTTP Server
     */
    constructor(server: http.Server) {
        this.server = new Socket.Server(server, {}) // Creates IO Socket Server
        this.clients = {}


        this.server.on("connection", (socket) => {
            console.log(`[ Server ] : ${socket.id} connected to the server`) // DEBUG


            // Gets Client Data
            socket.on("prespawn clientData", (data: PlayerData) => {
                // Adds Client to Client List
                this.clients[socket.id] = {
                    id: socket.id,

                    position: {
                        x: data.x,
                        y: data.y
                    }
                }


                // Sends Clients to Socket Client
                socket.emit("spawn clients", this.clients)
                socket.broadcast.emit("spawn client", this.clients[socket.id])
            })




            // Test Update
            socket.on("update client", (pos) => {
                this.clients[socket.id].position.x = pos.x
                this.clients[socket.id].position.y = pos.y

                // Send Back Updated Client Data
                socket.broadcast.emit("update client", this.clients[socket.id])
            })




            // Client Disconnection
            socket.on("disconnect", (reason) => {
                console.log(`[ Server ] : ${socket.id} left the Server --> [ ${reason} ]`)

                // Client Disconnection
                delete this.clients[socket.id]
                socket.broadcast.emit("despawn client", socket.id)
            })
        })
    }
}
