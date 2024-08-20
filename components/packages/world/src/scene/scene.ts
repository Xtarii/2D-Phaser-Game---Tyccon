import { World } from ".."



/**
 * Tileset Type
 */
type tile = {
    /**
     * Tileset name as specified in map data.
     */
    readonly tileName: string
    /**
     * Tileset key
     *
     * The image key of the tileset
     */
    readonly key: string
}



/**
 * Scene Object
 */
export class SceneObject {
    /**
     * Tilemap Base
     */
    readonly map: string

    /**
     * Tilesets List
     *
     * a list of this scenes
     * all tilesets.
     */
    private tilesets: tile[] = []
    /**
     * Layers List
     *
     * Each layer is connected to
     * a tileset by the tileset name.
     */
    private layers: {[key: string] : {name: string, collision?: boolean}[]} = {}



    /**
     * Creates a Scene Object
     *
     * @param map Tilemap key
     * @param tiles Tileset
     */
    constructor(map: string, tiles?: tile) {
        this.map = map
        if(tiles) this.add(tiles)
        this.onCreate() // Calls Custom Scene Setup
    }



    /**
     * Adds a Tileset to the map
     *
     * @param tiles Tileset
     */
    public add(tiles: tile) {
        this.tilesets.push(tiles)
        this.layers[tiles.tileName] = []
    }

    /**
     * Removes Tileset from the map
     *
     * Removes all tilesets that match
     * the tile specified.
     *
     * @param tiles Tileset
     */
    public remove(tiles: tile) : void
    /**
     * Removes Tileset from map
     *
     * Removes tileset at index
     * in tileset list.
     *
     * @param index Tileset index
     */
    public remove(index: number) : void

    public remove(tiles: tile | number) {
        if(typeof tiles === "number") this._removeIndex(tiles)
        else this._removeTiles(tiles)
    }

    private _removeTiles(tiles: tile) {
        const newList: tile[] = []
        for(const tile of this.tilesets)
            if(tile.key !== tiles.key && tile.tileName === tiles.tileName) newList.push(tile)
        this.tilesets = newList
    }
    private _removeIndex(index: number) {
        const newList: tile[] = []
        for(let x = 0; x < this.tilesets.length; x++)
            if(x !== index) newList.push(this.tilesets[x])
        this.tilesets = newList
    }



    /**
     * Adds Layer to Scene
     *
     * @param layer Layer Name
     * @param tileset TileName
     */
    addLayer(layer: {name: string, collision?: boolean}, tileset: string) { this.layers[tileset].push(layer) }
    /**
     * Removes layer from the Scene
     *
     * @param layer Layer Name
     * @param tileset Tileset Name
     */
    removeLayer(layer: {name: string, collision?: boolean}, tileset: string) {
        const newList: {name: string, collision?: boolean}[] = []
        for(const str of this.layers[tileset]) if(str !== layer) newList.push(str)
        this.layers[tileset] = newList
    }



    /**
     * Create Function
     *
     * Called once when the Scene is
     * created.
     */
    public onCreate = () => {}
    /**
     * On Scene Load
     *
     * Called once when the scene is loaded
     * into the world.
     *
     * @param scene Scene
     */
    public onLoad = (scene: World) => {}





    /**
     * Map Tilesets List
     */
    get Tilesets(): tile[] { return this.tilesets }
    /**
     * Map Layers by each tileset.
     *
     * Each Layer has a parent tileset.
     * ```ts
     * Layers = [
     *  tileName : [layers name]
     * ]
     * ```
     */
    get Layers(): {[key: string] : {name: string, collision?: boolean}[]} { return this.layers }
}
