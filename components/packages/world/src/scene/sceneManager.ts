import { SceneObject } from "./scene"



/**
 * Scene Manager Namespace
 */
export namespace scenes {
    /**
     * Scenes List
     *
     * Stores Scenes with key
     */
    const sceneList: {[key: string]: SceneObject} = {}



    /**
     * Adds Scene Object to Worlds Scene List
     *
     * @param key Scene Key
     * @param scene Scene Object
     */
    export function add(key: string, scene: SceneObject) { sceneList[key] = scene }
    /**
     * Removes Scene Object from Worlds Scene List
     *
     * @param key Scene Key
     */
    export function remove(key: string) { delete sceneList[key] }

    /**
     * Gets Scene List
     *
     * @returns Scene List
     */
    export function get() : {[key: string] : SceneObject}
    /**
     * Gets Scene in List
     *
     * Returns the scene with ```key```.
     * This will not return the entire list.
     *
     * @param key Scene Key
     * @returns Scene Object
     */
    export function get(key: string) : SceneObject


    export function get(key?: string) {
        if(key) return getKey(key)
        return sceneList
    }
    function getKey(key: string) : SceneObject { return sceneList[key] }
}
