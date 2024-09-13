import { Game } from "../../game.js"

const { SceneObject, World } = require("obesity-components")



export class Room_lvl1 extends SceneObject {
    constructor(map) {
        super(map, {tileName: "Isymetric tiles", key: "Isymetric tiles"})
    }
    onCreate() {
        // this.add({tileName: "128px BLOCK", key: "128px BLOCK"})
        // Scene Layers
        this.addLayer({name: "Grounds",collision: true}, "Isymetric tiles")
        this.addLayer({name: "Wall 1", collision: true}, "Isymetric tiles")
        this.addLayer({name: "Wall 2",collision: true}, "Isymetric tiles")
        this.addLayer({name: "Wall 3", collision: true}, "Isymetric tiles")
        this.addLayer({name: "block", collision: true}, "Isymetric tiles")

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
    }
}
