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
     * Creates Game Server instance
     */
    constructor(){
        const host = localStorage.getItem("host")
        if(host === null || host === "null") this.socket = Socket.io() // Connects to Local Socket Server
        else this.socket = Socket.io(host) // Connects to Socket Server



        // Adds Player
        this.socket.on("joined", (id) => {
            game.scene.getScene("main").add.image(50, 50, "player")
        })
    }
}
