import { storeRoomData } from "obesity-utils"
import { GameObjects, Scene } from "phaser"
import { Room as room } from "obesity-utils"
import { WorldManager } from "@obesity-components/world"



/**
 * ### Room Object
 *
 * Contains Data for the room.
 * Holds data such as
 * ```Door position``` and ```level```.
 */
export class Room extends GameObjects.Sprite {
    /**
     * Room Data
     *
     * JSON Data that holds
     * the rooms
     * - level
     * - cost
     * - door position
     * and more.
     */
    public readonly roomData: room



    /**
     * Creates a new Room Object
     *
     * Creates a room object in
     * ```scene``` with specified
     * properties.
     *
     * @param scene Parent Scene
     * @param id Room ID
     * @param data Room Data
     */
    constructor(scene: Scene, id: string, data: room) {
        /// Uses Grid Position as Door Position
        ///
        /// To Convert to a position vector ( x, y )
        /// the grid position axis needs to be multiplied by
        /// SpriteSize = 64
        /// Then subtract half of a SpriteSize = 32
        ///
        /// Result: (axis * SpriteSize) - (SpriteSize / 2)
        /// That is the center of the grid.
        super(scene, data.door.x * 64 - 32, data.door.y * 64 - 32, "interact key")
        scene.add.existing(this)
        this.setDepth(-5) // Hides Door from Map

        // Room Data
        this.roomData = data
        this.name = id

        if(!this.roomData.level) this.roomData.level = 1
        if(!this.roomData.status) this.roomData.status = "built"

        this.saveData() // Saves Room Data
        WorldManager.addRemovable(this) // Subscribes to be removed when the time comes
    }



    /**
     * Upgrades Room Level
     *
     * Sets Room level to {@link level}
     *
     * @param level Level
     */
    public upgrade(level: number) {
        this.roomData.level = level
        this.saveData() // Saves Room Data
    }



    /**
     * Saves Room Data
     */
    protected saveData() {
        storeRoomData(1, {id: this.name, room: this.roomData }) // Stores Data
    }





    /**
     * Room Level
     *
     * The Level of the room.
     * This decides what room
     * to load.
     */
    get level(): number | undefined { return this.roomData.level }
}
