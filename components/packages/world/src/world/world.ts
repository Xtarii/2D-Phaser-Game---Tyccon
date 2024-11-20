import { GameObjects, Physics, Scene, Tilemaps } from "phaser"
import { SceneObject } from "../scene/scene"
import { removeInteractableObject } from "@obesity-components/component"
import { World } from ".."



/**
 * Map Type
 */
type map = {
    /**
     * Tilemap Base
     */
    readonly base: Tilemaps.Tilemap
    /**
     * Tileset list
     */
    readonly tiles: Tilemaps.Tileset[]
    /**
     * Tilemap Layers
     */
    readonly layers: {layer: Tilemaps.TilemapLayer, collision?: boolean}[]
}



/**
 * World Manager Namespace
 */
export namespace WorldManager {
    /**
     * Collidable GameObjects in the Game
     */
    let collidable: {body: GameObjects.GameObject, collider?: Physics.Arcade.Collider}[] = []
    /**
     * Removable GameObjects
     *
     * These GameObjects will get removed
     * when there is a new scene loading.
     */
    let removable: GameObjects.GameObject[] = []
    /**
     * Map Object
     */
    let map: map | undefined



    /**
     * Loads Scene Object to Scene
     *
     * This will not trigger a onLoad
     * call on the scene.
     *
     * @param scene Scene
     * @param sceneObject Scene Object
     */
    export function loadSceneObject(scene: Scene, sceneObject: SceneObject) {
        // Creates Map
        map = { base: scene.make.tilemap({key: sceneObject.map}), tiles: [], layers: [] }

        for(const data of sceneObject.Tilesets) {
            const tiles = createTiles(data.tileName, data.key)
            createLayers(tiles, sceneObject.Layers[data.tileName])
            for(const layer of map.layers) if(layer.collision) setCollidableLayer(scene, layer.layer)
            map.tiles.push(tiles)
        }

        // Updates Camera Bounds after world loading to get world properties
        scene.cameras.main.setBounds(-15, -15, map.base.widthInPixels + 30, map.base.heightInPixels + 30)
    }

    /**
     * Creates Tileset
     *
     * Throws Error if map is
     * no created yet or the
     * tiles could not be found.
     *
     * @param tileName Tileset Name
     * @param key Tileset Key
     * @returns Tileset
     */
    function createTiles(tileName: string, key: string) : Tilemaps.Tileset {
        if(!map) throw new Error("Map is not created yet")
        const tiles = map.base.addTilesetImage(tileName, key)
        if(!tiles) throw new TypeError("Could not find tiles: " + tileName + ", so tiles is null")
        return tiles
    }

    /**
     * Creates Layers for Tiles
     *
     * When a Layer is created it is
     * added to layers list in map.
     *
     * Throws Error if map was not
     * created or layer could not
     * be found in tiles.
     *
     * @param tiles Tiles
     * @param layers Layers List
     */
    function createLayers(tiles: Tilemaps.Tileset, layers: {name: string, collision?: boolean}[]) {
        if(!map) throw new Error("Map is not created yet")
        for(const data of layers) {
            const layer = map.base.createLayer(data.name, tiles)
            if(!layer) throw new TypeError("Could not find layer: " + data.name + ", so layer is null")
            map.layers.push({layer, collision: data.collision})
        }
    }

    /**
     * Sets Layer to collide with collidable objects
     *
     * @param scene Scene
     * @param layer Layer
     */
    function setCollidableLayer(scene: Scene, layer: Tilemaps.TilemapLayer) {
        for(const obj of collidable) obj.collider = scene.physics.add.collider(obj.body, layer)
        layer.setCollisionBetween(0, 100) // This is needed for some reason to add collision ( both lines )
    }


    /**
     * Add Collidable Object to Scene
     *
     * Only add the objects if they
     * should be able to collide
     * with the world and scene.
     *
     * @param object Object
     */
    export function addCollidable(object: GameObjects.GameObject) {
        collidable.push({body: object})

        // Adds Collision to Existing Layers
        if(map) for(const layer of map.layers)
            if(layer.collision) setCollidableLayer(layer.layer.scene, layer.layer)
    }
    /**
     * Removes Collidable Object from Scene Collidable List
     *
     * This will destroy the collider object that
     * the scene uses for collision with the scene,
     * but all other colliders will remain untouched.
     *
     * @param object Object
     */
    export function removeCollidable(object: GameObjects.GameObject) {
        const newList = []
        for(const obj of collidable) {
            if(obj.body === object) {
                obj.collider?.destroy()
                continue
            }
            newList.push(obj)
        }
        collidable = newList
    }

    /**
     * Adds Removable object
     *
     * This will set ```object```
     * as removable and will therefore
     * remove it when the scene is unloaded.
     *
     * If there is no scene loaded when this is called
     * the object is added to the next scene and
     * will therefore not be force removed.
     *
     * @param object Object
     */
    export function addRemovable(object: GameObjects.GameObject) { removable.push(object) }
    /**
     * Removes Object from Removable list
     *
     * This will not destroy the object
     * ```ts
     * obj.destroy()
     * ```
     * It will instead mark it as ```keep on unload```
     * witch tells the world to keep the object
     * even if the scene is not loaded.
     *
     * @param object Object
     */
    export function removeRemovable(object: GameObjects.GameObject) {
        const newList = []
        for(const obj of removable) if(obj !== object) newList.push(obj)
        removable = newList
    }

    /**
     * Checks if Object is in removable
     * @param object Object
     * @returns Status
     */
    function isInRemovable(object: GameObjects.GameObject) : boolean {
        for(const obj of removable) if(obj === object) return true
        return false
    }



    /**
     * Removes Scene
     *
     * Removes Scene and all objects marked
     * as removable.
     * ```ts
     * WorldManager.addRemovable(obj) // Adds obj
     * ```
     *
     * Removes all Colliders with the scene
     */
    export function removeLoadedScene() {
        if(!map) throw new Error("No map has been created")

        cleanupCollidable() // Removes Colliders
        cleanupRemovable()  // Removes Removable

        map.base.destroy() // Destroys Map ( includes layers and tiles )
    }
    function cleanupCollidable() {
        const newCollidable = []
        for(const obj of collidable) {
            obj.collider?.destroy()

            // Adds obj to new Collidable if it is not removed later
            if(!isInRemovable(obj.body)) newCollidable.push(obj)
        }
        collidable = newCollidable // Updates Collidable so old objects will remain
    }
    function cleanupRemovable() {
        for(const obj of removable) {
            obj.destroy(true)

            // Removes obj interaction if it exists
            if(obj instanceof GameObjects.Sprite) removeInteractableObject(obj)
        }
        removable = []
    }



    /**
     * Auto Cleanup and Load of Scene
     *
     * If there is a loaded scene it
     * gets cleaned up so that the
     * new scene can load without problems.
     *
     * This will call the scene onLoad.
     *
     * @param scene Scene
     * @param sceneObject Scene Object
     */
    export function autoLoad(scene: World, sceneObject: SceneObject) {
        scene.physics.pause() // Pauses Physics
        scene.game.pause()

        if(map) removeLoadedScene()

        loadSceneObject(scene, sceneObject)
        sceneObject.onLoad(scene) // Scene OnLoad ( Enables Scene Setup )

        scene.physics.resume() // Starts Physics
        scene.game.resume()
    }
}
