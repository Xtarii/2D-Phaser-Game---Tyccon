import { Room, Client, ClientArray } from "colyseus"
import { Schema } from "@colyseus/schema"



/**
 * Player Object
 */
class Player extends Schema {
    x: number = 0
    y: number = 0
}

class State extends Schema {
    players = new Map<string, Player>()
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
