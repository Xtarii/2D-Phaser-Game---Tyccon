import { Room, Client, ClientArray } from "colyseus"
import { MapSchema, Schema, type } from "@colyseus/schema"



/**
 * Player Object
 */
class Player extends Schema {
    @type("string") name: string = "name"
    @type("string") spriteID: string = "sprite"

    @type("number") x: number = 0
    @type("number") y: number = 0
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
 * Handels Game Backend data like player connections and
 * world build updates.
 */
export class ServerSocket extends Room<State> {
    onCreate(options: any): void | Promise<any> {
        this.setState(new State())

        console.log("Game Server Started...")
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

        this.state.players.set(client.sessionId, player) // Adds Player to Server Player List
    }

    onLeave(client: Client<this['clients'] extends ClientArray<infer U, any> ? U : never, this['clients'] extends ClientArray<infer _, infer U> ? U : never>, consented?: boolean | undefined): void | Promise<any> {
        console.log(`[ Server ] : Client ${client.sessionId} left`) // DEBUG

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
}
