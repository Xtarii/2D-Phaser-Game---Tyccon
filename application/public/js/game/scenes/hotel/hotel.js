import { Game } from "../../game.js"

const { SceneObject, World } = require("obesity-components")



export class level1 extends SceneObject {
    onCreate() {
        // Scene Layers
        this.addLayer({name: "ground"}, "Hotel tiles")
        this.addLayer({name: "wall", collision: true}, "Hotel tiles")

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

        // Gets Room Data
        if(Game.server.room) Game.server.room.send("get level data", 1)
        else scene.setupDoors(1)
    }
}
