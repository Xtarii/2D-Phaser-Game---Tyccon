import MainScene from "../../world/scenes/mainScene.js"

const { SceneObject, World, Rooms } = require("obesity-components")



export class Room_lvl1 extends SceneObject {
    constructor(map) {
        super(map, {tileName: "hotelTiles", key: "base"})
    }
    onCreate() {
        // Scene Layers
        this.addLayer({name: "grounds"}, "hotelTiles")
        this.addLayer({name: "walls", collision: true}, "hotelTiles")
        this.addLayer({name: "doors", collision: true}, "hotelTiles")

        /// The Constructor Params are
        /// ( "hotel tilemap", {tileName: "Hotel tiles", key: "hotel tileset"} )
        ///
        /// So in line: 8 -> this.addLayer({name: "ground"}, "Hotel tiles")
        /// The last name is the tileName in the constructor Params.
        ///
        /// This is because the Params create a new tileset with the name: "Hotel tiles"
        /// So to use it to add a layer - the layer can use: "Hotel tiles" in the end of
        /// its constructor params.
    }

    onLoad(s) {
        /** @type {World} */
        const scene = s
        MainScene.player.setPosition(64*2-32, 64*3-32)
        Rooms.createDoor(scene, 1, 3, () => {
            // Load Lobby Scenes
        })
    }
}
