import { Scene } from "phaser"
import { Room } from "./room"
import { EventEmitter, Room as room } from "obesity-utils"
import { addInteractableObject } from "@obesity-components/component"
import { WorldManager } from "@obesity-components/world"



/**
 * Rooms Namespace
 */
export namespace Rooms {
    /**
     * Rooms Event Handler
     */
    export const events: EventEmitter<{
        enter  : [Room]
        build  : [Room]
        upgrade: [Room]
    }> = new EventEmitter()

    /**
     * Local Room List
     *
     * This holds a reference to all
     * the rooms that have been built.
     * That is the rooms that have a
     * door and that can be entered.
     */
    const rooms: Room[] = []



    /**
     * Build Room
     *
     * Creates a door ( room entrance )
     * and a room object with room data.
     *
     * @param scene Scene
     * @param data Room Data
     */
    export function buildRoom(scene: Scene, data: { name: string, room: room }) {
        // Throws Error if the room already exists
        for(const room of rooms) if(room.name === data.name) throw new Error("Room already built")

        // Creates a new Room Instance and adds it to room list
        const room = new Room(scene, data.name, data.room)
        addInteractableObject(room, () => events.emit("enter", room)) // Makes the Room Interactable
        rooms.push(room) // Stores Room
        events.emit("build", room)
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
            events.emit("upgrade", room)
            return
        }
        throw new Error("Room Not Found") // Error if the Room was not found
    }



    /**
     * Creates a Door Object
     *
     * Creates a door object that will call
     * the ```callback``` when interacted with.
     *
     * @param scene Scene
     * @param x X Grid Position
     * @param y Y Grid Position
     * @param callback Callback
     */
    export function createDoor(scene: Scene, x: number, y: number, callback: () => void) {
        const door = scene.add.sprite(x * 64 - 32, y * 64 - 32, "interact key")
        door.setDepth(-5)
        WorldManager.addRemovable(door) // Adds Room to be removed on new Scene load
        addInteractableObject(door, callback)
    }
}
