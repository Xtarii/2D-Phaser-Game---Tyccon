const { Client, Room } = require("colyseus.js")
const { PlayerData, Runtime } = require("obesity-utils")
const { Rooms } = require("obesity-components")

import MainScene, { checkGameInstances } from "../world/scenes/mainScene.js"
import { Game } from "../game.js"
import NetworkPlayer from "./networkObjects/networkPlayer.js"



/**
 * Game Server
 */
export default class Server {
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
     *
     * @type {Object.<string, NetworkPlayer>}
     */
    players = {}





    /**
     * Creates Game Server instance
     */
    constructor(){
        if(Runtime.Server.getAddress() === null){
            this.socket = new Client("ws://localhost:1024") // Connects to Local Socket Server
            Runtime.Player.setRole("host") // Sets Role to Host ( Default to Client )
        }else this.socket = new Client(Runtime.Server.getAddress()) // Connects to Socket Server

        // this.socket = new Client("ws://192.168.250.67:1024") // Temporary



        // Joins Server Room
        this.join().then(() => {
            // Player join room event
            this.room.state.players.onAdd((player, sessionId) => {
                if (sessionId === this.room.sessionId) return // Return if local player


                // Creates Network Player Object
                console.log("Client connected to this server") // DEBUG
                const networkPlayer = new NetworkPlayer(
                    Game.scene.getScene("main"), // Scene

                    // Position
                    player.x,
                    player.y,
                    player.l,

                    // Extra Data
                    player.spriteID,
                    player.name,
                    99 // Scene Depth
                )

                // Adds player to game
                this.players[sessionId] = networkPlayer


                // player update event
                player.onChange(() => {
                    networkPlayer.x = player.x
                    networkPlayer.y = player.y
                    networkPlayer.level = player.l

                    networkPlayer.update() // Updates Name Position
                })
            })

            // PLayer leave room event
            this.room.state.players.onRemove((player, sessionId) => {
                this.players[sessionId].nameBar.destroy(true)
                this.players[sessionId].destroy(true)
                delete this.players[sessionId]
            })



            // Client Room Data
            this.room.onMessage("get level data", (data) => MainScene.main.setupDoors(data))
            this.room.onMessage("build room", (data) =>
                Rooms.buildRoom(MainScene.main, { name: data.name, room: data }))
            this.room.onMessage("upgrade room", (data) =>
                Rooms.upgradeRoom(data.name, data.level))
        })
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

        const playerData = PlayerData.readPlayerData()

        // Constructs Player Data
        const data = {
            name: playerData.name,
            spriteID: playerData.spriteID,

            // Position
            x: MainScene.player.x,
            y: MainScene.player.y,
            l: MainScene.player.level
        }

        // Joins Room
        this.room = await this.socket.joinOrCreate("main", data)
        console.log("Connected to UDP Server")
    }
}
