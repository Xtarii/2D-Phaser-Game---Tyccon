import { Room, Client, ClientArray } from "colyseus"
import { MapSchema, Schema, type } from "@colyseus/schema"
import { getRoomsData } from "obesity-utils"
import { Room as R } from "obesity-utils"



/**
 * Player Object
 */
class Player extends Schema {
    /**
     * Player Name
     */
    @type("string") name: string = "name"
    /**
     * Player Sprite ID
     */
    @type("string") spriteID: string = "sprite"

    /**
     * Player X Position
     */
    @type("number") x: number = 0
    /**
     * Player Y Position
     */
    @type("number") y: number = 0
    /**
     * Player Level or map
     */
    @type("string") l: string = "0"
}

/**
 * Game State ( Server Side )
 */
class State extends Schema {
    @type({ map: Player }) players = new MapSchema<Player>()
}





/**
 * Game Server Socket
 *
 * Handles Game Backend data like player connections and
 * world build updates.
 */
export default class ServerSocket extends Room<State> {
    onCreate(options: any): void | Promise<any> {
        this.setState(new State())

        console.log("Game Server Setup...")

        // Player Update
        this.onMessage("update player", (client: Client, data: { x: number, y: number, l: number | string }) => {
            const player: Player | undefined = this.state.players.get(client.sessionId)
            if(player === undefined) return // Returns if No Player

            // Updates Player Position
            player.x = data.x
            player.y = data.y
            player.l = data.l.toString()
        })

        // Room Data
        this.onMessage("get level data", (client: Client, level: number | string) =>
            client.send("get level data", getRoomsData(level)))
        this.onMessage("build room", (client: Client, room: R) =>
            this.broadcast("build room", room, { except: client }))
        this.onMessage("upgrade room", (client: Client, room: R) =>
            this.broadcast("upgrade room", room, { except: client }))

        this.onMessage("change level", (client: Client, level: string) => {
            const player: Player | undefined = this.state.players.get(client.sessionId)
            if(!player) return
            player.l = level
        })
    }





    onJoin(client: Client<this['clients'] extends ClientArray<infer U, any> ? U : never, this['clients'] extends ClientArray<infer _, infer U> ? U : never>, options?: any, auth?: (this['clients'] extends ClientArray<infer _, infer U> ? U : never) | undefined): void | Promise<any> {
        console.log(`[ Server ] : ${client.sessionId} joined`) // DEBUG


        // Adds Player
        const player = new Player() // Creates Player Instance

        // Player Name and Sprite
        player.name = options.name
        player.spriteID = options.spriteID

        // Random Position
        player.x = options.x
        player.y = options.y
        player.l = options.l.toString()

        this.state.players.set(client.sessionId, player) // Adds Player to Server Player List
    }

    onLeave(client: Client<this['clients'] extends ClientArray<infer U, any> ? U : never, this['clients'] extends ClientArray<infer _, infer U> ? U : never>, consented?: boolean | undefined): void | Promise<any> {
        console.log(`[ Server ] : Client ${client.sessionId} left`) // DEBUG

        // Removes Player
        this.state.players.delete(client.sessionId)
    }

    onDispose(): void | Promise<any> {
        // Cleanup
    }
}
