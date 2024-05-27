const Socket = require("socket.io-client")
import { game } from "../game.js"



/**
 * Game Server
 */
export class Server {
    /**
     * Socket Connection
     *
     * @type {Socket.Socket}
     */
    socket

    /**
     * Clients TEST
     */
    clients = {}





    /**
     * Creates Game Server instance
     */
    constructor(){
        const host = localStorage.getItem("host")
        if(host === null || host === "null") this.socket = Socket.io() // Connects to Local Socket Server
        else this.socket = Socket.io(host) // Connects to Socket Server

        // Local Player Connected to Server
        this.socket.on("connect", () => {
            // Local Client Data
            this.socket.emit("prespawn playerData", {
                x:10,
                y:10
            })

            // Spawns Clients
            this.socket.on("spawn clients", (data) =>  {
                for (let i in data) {
                    if (data[i].id !== this.socket.id){
                        // Adds Client to scene
                        const obj = game.scene.getScene("main").add.image(data[i].position.x, data[i].position.y, "player")

                        this.clients[i] = {
                            body: obj
                        }
                    }
                }
            })
            this.socket.on("update client", (data) => {
                // Updates client
                this.clients[data.id].body.x = data.position.x
                this.clients[data.id].body.y = data.position.y
            })


            this.socket.on("despawn client", id => {
                this.clients[id].body.destroy(true)

                // Removes Client
                delete this.clients[id]


                console.log(this.clients)
            })
        })
    }
}
