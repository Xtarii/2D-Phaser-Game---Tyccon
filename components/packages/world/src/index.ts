import { GameObjects, Scene } from "phaser"
import { SceneObject } from "./scene/scene"
import { WorldManager } from "./world/world"
import { scenes } from "./scene/sceneManager"
import { getRoomsData } from "obesity-utils"
import { Rooms } from "@obesity-components/room-manager"



/**
 * ### World Scene Manager
 *
 * Controls Scene loading and
 * the management of tilemaps,
 * tilesets and the loading and
 * unloading of instances in
 * the World ( Scene ).
 */
export class World extends Scene {
    /**
     * Loads Scene Object
     *
     * **Recommended** to create a
     * scene and load it using
     * ```ts
     * loadScene("key")
     *
     * // or
     * loadScene(scenes.get("key"))
     *
     *
     * // NOT
     * loadScene(new SceneObject(...params))
     * ```
     *
     * @param scene Scene Object
     */
    public loadScene(scene: SceneObject) : void
    /**
     * Loads Scene from Scene List
     *
     * @param key Scene Key
     */
    public loadScene(key: string) : void


    public loadScene(scene: SceneObject | string) {
        if(scene instanceof SceneObject) {
            WorldManager.autoLoad(this, scene)
        }else {
            WorldManager.autoLoad(this, scenes.get(scene))
        }
    }



    /**
     * Add Collidable Object to the Scene
     *
     * Only add the object if it should
     * collide with the world and scene.
     *
     * @param object Object
     */
    public addCollidableObject = (object: GameObjects.GameObject) => { WorldManager.addCollidable(object) }

    /**
     * Adds Removable object
     *
     * Sets this object to be removed
     * when the scene unloads.
     *
     * @param object Object
     */
    public addRemovable = (object: GameObjects.GameObject) => { WorldManager.addRemovable(object) }



    /**
     * Setup for Hotel Doors
     *
     * Creates doors for built rooms.
     *
     * @param level Hotel Level
     */
    public setupDoors = (level: number | string) => {
        const rooms = getRoomsData(level)
        for(let i in rooms) if(rooms[i].status === "built") {
            const room = rooms[i]
            Rooms.buildRoom(this, { name: i, room: room })
        }
    }
}





// Library Export
export * from "./scene/scene"
export * from "./scene/sceneManager"
export * from "./world/world"
