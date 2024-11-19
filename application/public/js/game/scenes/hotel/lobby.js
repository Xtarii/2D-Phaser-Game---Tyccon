import { Game } from "../../game.js"
import MainScene from "../../world/scenes/mainScene.js"

const { SceneObject, World, Rooms } = require("obesity-components")



export default class Lobby extends SceneObject {
    constructor(map) {
        super(map, {tileName: "hotelTiles", key: "base"})
    }

    onCreate() {
        this.addLayer({name: "grounds"}, "hotelTiles")
        this.addLayer({name: "walls", collision: true}, "hotelTiles")
        this.addLayer({name: "doors"}, "hotelTiles")
    }

    onLoad(s) {
        /** @type {World} */
        const scene = s
        this.setupWorld(scene)
        this.setupPlayer()


        Rooms.createDoor(scene, 7.5, 3, () => {
            scene.loadScene("room:1 lvl:1")
        })
        // Office Door
        Rooms.createDoor(scene, 15.5, 14, () => {
            console.log("Enters Office")
        })
    }



    setupWorld(scene) {
        // Gets Room Data
        // if(Game.server.room) Game.server.room.send("get level data", 1)
        // else scene.setupDoors(1) // Problem is located here



        /// Infinite MAP
        /// So camera bounds needs to be set manually
        scene.cameras.main.setBounds(-15, -15, 16 * 64 + 30, 16 * 64 + 30)
    }
    setupPlayer() {
        // Teleport player
        const x = 64 * 8.5 - 32, y = 64 * 8 - 32
        if(MainScene.player) MainScene.player.setPosition(
            x + Math.random() * ((64 * 2) - -(64 * 2)) + -(64 * 2),
            y + Math.random() * ((64 * 2) - -(64 * 2)) + -(64 * 2)
        )
    }
}
