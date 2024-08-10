import { gridPosition } from "obesity-utils"
import { GameObjects, Scene } from "phaser"



/**
 * ### Room Object
 *
 * Contains Data for the room.
 * Holds data such as
 * ```Door position``` and ```level```.
 */
export class Room extends GameObjects.Sprite {
    /**
     * Rooms Door Position
     *
     * The Position of the Rooms
     * Door on the grid.
     */
    public readonly grid: gridPosition
    /**
     * Room Level
     *
     * The Level of the room.
     * This decides what room
     * to load.
     */
    private _level: number
    /**
     * Room Type
     *
     * The Type of the room.
     * This decides what type
     * of room to load.
     */
    public readonly roomType: string



    constructor(scene: Scene, position: gridPosition, level: number, type: string, name: string) {
        /// Uses Grid Position as Door Position
        ///
        /// To Convert to a position vector ( x, y )
        /// the grid position axis needs to be multiplied by
        /// SpriteSize = 64
        /// Then subtract half of a SpriteSize = 32
        ///
        /// Result: (axis * SpriteSize) - (SpriteSize / 2)
        /// That is the center of the grid.
        super(scene, position.x * 64 - 32, position.y * 64 - 32, "interact key")
        scene.add.existing(this)
        this.setDepth(20) // Hides Door from Map

        // Room Data
        this.grid = position
        this._level = level
        this.roomType = type
        this.name = name

        this.saveData() // Saves Room Data
    }



    /**
     * Upgrades Room Level
     *
     * Sets Room level to {@link level}
     *
     * @param level Level
     */
    public upgrade(level: number) {
        this._level = level
        this.saveData() // Saves Room Data
    }



    /**
     * Saves Room Data
     */
    protected saveData() {
        console.log("Saving Room...")
    }





    /**
     * Room Level
     *
     * The Level of the room.
     * This decides what room
     * to load.
     */
    get level(): number { return this._level }
}
