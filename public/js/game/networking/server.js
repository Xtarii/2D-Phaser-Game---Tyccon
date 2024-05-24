const Socket = require("socket.io-client")



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
        const game = localStorage.getItem("game")
        if(game === "null") game = "localhost:8080"

        this.socket = Socket.io(game) // Connects to Socket Server



        this.socket.on("joined", (id) => console.log(id))
    }
}
