import { Room, Client, ClientArray } from "colyseus"
import { MapSchema, Schema, type } from "@colyseus/schema"



/**
 * Player Object
 */
class Player extends Schema {
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
}
