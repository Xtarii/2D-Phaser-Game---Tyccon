const Socket = require("socket.io-client")
import { game } from "../game.js"
import { MainScene } from "../world/scenes/mainScene.js"



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


        // Local Client Connection Handler
        this.socket.on("connect", () => {
            // Local Client Data
            this.socket.emit("prespawn clientData", {
                x: MainScene.player.x,
                y: MainScene.player.y
            })

            // Spawns Clients
            this.socket.on("spawn clients", (data) =>  {
                for (let i in data) {
                    if (data[i].id !== this.socket.id){
                        // Adds Client to scene
                        const obj = game.scene.getScene("main").add.image(
                            data[i].position.x, data[i].position.y, "player")

                        this.clients[i] = {
                            body: obj
                        }
                    }
                }
            })
            this.socket.on("spawn client", (data) => {
                // Adds Client to scene
                const obj = game.scene.getScene("main").add.image(
                    data.position.x, data.position.y, "player")
                
                this.clients[data.id] = {
                    body: obj
                }
            })


            // Client Update
            this.socket.on("update client", (data) => {
                // Updates client
                this.clients[data.id].body.x = data.position.x
                this.clients[data.id].body.y = data.position.y
            })


            // Client Despawn
            this.socket.on("despawn client", (id) => {
                this.clients[id].body.destroy(true)

                // Removes Client
                delete this.clients[id]


                console.log(this.clients)
            })
        })
    }
}
