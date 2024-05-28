import { Room, Client, ClientArray } from "colyseus"
import { Schema } from "@colyseus/schema"



/**
 * Player Object
 */
class Player extends Schema {
    x: number = 0
    y: number = 0
}

class State extends Schema {
    players = new Map<string, Player>()
}





/**
 * Game Server Socket
 *
 * Handels Game Backend data like player connections and
 * world build updates.
 */
export class ServerSocket extends Room<State> {
    onCreate(options: any): void | Promise<any> {
        this.setState(new State())
    }

    onJoin(client: Client<this['clients'] extends ClientArray<infer U, any> ? U : never, this['clients'] extends ClientArray<infer _, infer U> ? U : never>, options?: any, auth?: (this['clients'] extends ClientArray<infer _, infer U> ? U : never) | undefined): void | Promise<any> {
        // Adds Player
        console.log(options)

        const player = new Player()
        player.x = options.x || 0
        player.y = options.y || 0
        this.state.players.set(client.sessionId, player)
    }

    onLeave(client: Client<this['clients'] extends ClientArray<infer U, any> ? U : never, this['clients'] extends ClientArray<infer _, infer U> ? U : never>, consented?: boolean | undefined): void | Promise<any> {
        // Removes Player
        this.state.players.delete(client.sessionId)
    }

    onMessage(client: any, message: any){
        // Message
        console.log(client + " :: " + message)
    }

    onDispose(): void | Promise<any> {
        // Cleanup
    }



    // /**
    //  * Creates Game Server Instance
    //  *
    //  * @param server HTTP Server
    //  */
    // constructor(server: http.Server) {
    //     this.server = new Socket.Server(server, {}) // Creates IO Socket Server
    //     this.clients = {}


    //     this.server.on("connection", (socket) => {
    //         console.log(`[ Server ] : ${socket.id} connected to the server`) // DEBUG


    //         // Gets Client Data
    //         socket.on("prespawn clientData", (data: PlayerData) => {
    //             // Adds Client to Client List
    //             this.clients[socket.id] = {
    //                 id: socket.id,

    //                 position: {
    //                     x: data.x,
    //                     y: data.y
    //                 }
    //             }


    //             // Sends Clients to Socket Client
    //             socket.emit("spawn clients", this.clients)
    //             socket.broadcast.emit("spawn client", this.clients[socket.id])
    //         })




    //         // Test Update
    //         socket.on("update client", (pos) => {
    //             this.clients[socket.id].position.x = pos.x
    //             this.clients[socket.id].position.y = pos.y

    //             // Send Back Updated Client Data
    //             socket.broadcast.emit("update client", this.clients[socket.id])
    //         })




    //         // Client Disconnection
    //         socket.on("disconnect", (reason) => {
    //             console.log(`[ Server ] : ${socket.id} left the Server --> [ ${reason} ]`)

    //             // Client Disconnection
    //             delete this.clients[socket.id]
    //             socket.broadcast.emit("despawn client", socket.id)
    //         })
    //     })
    // }
}
