const { Client, Room } = require("colyseus.js")
import { MainScene, checkGameInstances } from "../world/scenes/mainScene.js"
import { game } from "../game.js"



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
     * Server Room
     *
     * @type {Room}
     */
    room

    /**
     * Clients TEST
     */
    players = {}





    /**
     * Creates Game Server instance
     */
    constructor(){
        const host = localStorage.getItem("host")
        if(host === null || host === "null" || host === ""){


            this.socket = new Client("ws://localhost:1024") // Connects to Local Socket Server


        }else this.socket = new Client(host) // Connects to Socket Server
        // Joins Server Room
        this.join().then(() => {
            // Player join room event
            this.room.state.players.onAdd((player, sessionId) => {
                if (sessionId === this.room.sessionId) return // Return if local player
              
                // Adds player to game
                const obj = game.scene.getScene("main").add.image(player.x, player.y, player.spriteID)
                const data = {
                    name: player.name,
                    body: obj
                }
                this.players[sessionId] = data


                // player update event
                player.onChange(() => {
                    obj.x = player.x
                    obj.y = player.y
                })
                
            })
            // PLayer leave room event
            this.room.state.players.onRemove((player, sessionId) => {
                this.players[sessionId].body.destroy(true)
                delete this.players[sessionId]
            })
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


    /**
     * Joins **main** Server Room
     *
     * Sends Prespawn Player Data
     * - Sprite ID
     * - Player Name
     */
    join = async () => {
        await checkGameInstances() // Check if Game is fully loaded


        // Constructs Player Data
        const data = {
            name: localStorage.getItem("playerName"),
            spriteID: localStorage.getItem("spriteID"),

            // Position
            x: MainScene.player.x,
            y: MainScene.player.y
        }

        // Joins Room
        this.room = await this.socket.joinOrCreate("main", data)
        console.log("Connected to UDP Server")
    }
}
