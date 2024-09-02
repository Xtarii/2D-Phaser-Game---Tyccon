import { Game } from "../../game.js"
import MainScene from "../../world/scenes/mainScene.js"

const { SceneObject, World } = require("obesity-components")



export default class Lobby extends SceneObject {
    constructor(map) {
        super(map, {tileName: "Hotel tiles", key: "hotel tileset"})
    }

    onCreate() {
        this.addLayer({name: "ground"}, "Hotel tiles")
        this.addLayer({name: "wall", collision: true}, "Hotel tiles")
        this.addLayer({name: "wall_over", collision: true}, "Hotel tiles")
    }

    onLoad(s) {
        /** @type {World} */
        const scene = s
        this.setupWorld(scene)
        this.setupPlayer()


        // Office Door
    }



    setupWorld(scene) {
        // Gets Room Data
        if(Game.server.room) Game.server.room.send("get level data", 1)
        else scene.setupDoors(1)



        /// Infinite MAP
        /// So camera bounds needs to be set manually
        scene.cameras.main.setBounds(-15, -15, 16 * 64 + 30, 16 * 64 + 30)
    }
    setupPlayer() {
        // Teleport player
        const x = 64 * 8.5 - 32, y = 64 * 14 - 32
        if(MainScene.player) MainScene.player.setPosition(
            x + Math.random() * ((64 * 2) - -(64 * 2)) + -(64 * 2),
            y + Math.random() * ((64 * 2) - -(64 * 2)) + -(64 * 2)
        )
    }
}
