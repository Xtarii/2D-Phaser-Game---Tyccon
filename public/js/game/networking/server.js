const { Client } = require("colyseus.js")

import { game } from "../game.js"
import { MainScene } from "../world/scenes/mainScene.js"



/**
 * Game Server
 */
export class Server {
    /**
     * Socket Connection
     *
     * @type {Client}
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
        if(host === null || host === "null") this.socket = new Client() // Connects to Local Socket Server
        else this.socket = new Client(host) // Connects to Socket Server



        const room = this.socket.joinOrCreate("main", {x: 10, y: 10}).then(() => {
            console.log("Connected to UDP Server")
        })



        // // Spawns Clients
        // this.socket.on("spawn clients", (data) =>  {
        //     for (let i in data) {
        //         if (data[i].id !== this.socket.id){
        //             // Adds Client to scene
        //             const obj = game.scene.getScene("main").add.image(
        //                 data[i].position.x, data[i].position.y, "player")

        //             this.clients[i] = {
        //                 body: obj
        //             }
        //         }
        //     }
        // })
        // // Spawn New Client
        // this.socket.on("spawn client", (data) => {
        //     // Adds Client to scene
        //     const obj = game.scene.getScene("main").add.image(
        //         data.position.x, data.position.y, "player")

        //     this.clients[data.id] = {
        //         body: obj
        //     }
        // })


        // // Client Update
        // this.socket.on("update client", (data) => {
        //     // Updates client
        //     this.clients[data.id].body.x = data.position.x
        //     this.clients[data.id].body.y = data.position.y
        // })


        // // Client Despawn
        // this.socket.on("despawn client", (id) => {
        //     this.clients[id].body.destroy(true)
        //     delete this.clients[id]
        // })
        // // Disconnection Event
        // this.socket.on("disconnect", () => {
        //     this.socket.close()
        //     location.href = "/"
        // })
    }
}
