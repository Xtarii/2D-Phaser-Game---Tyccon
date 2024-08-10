import { Scene } from "phaser"
import { Room } from "./room"
import { Room as room } from "obesity-utils"



/**
 * Rooms Namespace
 */
export namespace Rooms {
    /**
     * Local Room List
     *
     * This holds a reference to all
     * the rooms that have been built.
     * That is the rooms that have a
     * door and that can be entered.
     */
    const rooms: Room[] = []



    export function buildRoom(scene: Scene, data: { name: string, room: room }) {
        // Throws Error if the room already exists
        for(const room of rooms) if(room.name === data.name) throw new Error("Room already built")

        // Handles Room Data
        const level = data.room.level ?? 1


        // Creates a new Room Instance and adds it to room list
        const room = new Room(scene, data.room.door, level, data.room.type, data.name)
        rooms.push(room)
    }

    /**
     * Upgrades Room to Level
     *
     * If room is built and can be upgraded,
     * then this will upgrade room.
     * If it is unable to upgrade it will
     * throw an error.
     *
     * @param id Room ID
     * @param level Level
     * @throws Error if Room was not found
     */
    export function upgradeRoom(id: string, level: number) {
        for(const room of rooms) if(room.name === id) {
            room.upgrade(level)
            return
        }
        throw new Error("Room Not Found") // Error if the Room was not found
    }
}
