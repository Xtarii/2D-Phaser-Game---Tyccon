import { Game } from "../../game.js"
import MainScene from "../../world/scenes/mainScene.js"

const { SceneObject, World, Rooms } = require("obesity-components")
const { Runtime } =  require("obesity-utils")



export default class Lobby extends SceneObject {
    /**
     * Players last position
     */
    playerLastPosition = null



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


        Rooms.createDoor(scene, 3, 4, () => { // First Door, to room A1
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


        // Test Button ( PC )
        const testComputer_HotelManager = this.add.sprite(200, 500, "player")
        testComputer_HotelManager.setDepth(55)

        testComputer_HotelManager.manager = new Manager(this) // Build Manager

        // Manager Event
        testComputer_HotelManager.manager.events.on("open", () => {
            MainScene.player.interactButton.destroy()
            MainScene.player.interactButton = null // Removes Interact Button
            MainScene.player.components[0].target = null // Removes Target

            MainScene.player.components[0].run = false // Interact Component
            MainScene.player.canMove = false // Player Can't Move
        })
        testComputer_HotelManager.manager.events.on("close", () => {
            MainScene.player.components[0].run = true // Interact Component
            MainScene.player.canMove = true // Player Can Move
        })

        /// Test Manager Interact Event
        addInteractableObject(testComputer_HotelManager, () => testComputer_HotelManager.manager.manager())
        this.addRemovable(testComputer_HotelManager)



        /// Infinite MAP
        /// So camera bounds needs to be set manually
        scene.cameras.main.setBounds(-15, -15, 16 * 64 + 30, 16 * 64 + 30)
    }
    setupPlayer() {
        // Teleport player
        const x = 64 * 8.5 - 32, y = 64 * 8 - 32
        if(!MainScene.player) return

        // Sets players position to the last position in this scene, otherwise it is default spawn random
        if(this.playerLastPosition) MainScene.player.setPosition(this.playerLastPosition.x, this.playerLastPosition.y)
        else MainScene.player.setPosition(
            x + Math.random() * ((64 * 2) - -(64 * 2)) + -(64 * 2),
            y + Math.random() * ((64 * 2) - -(64 * 2)) + -(64 * 2)
        )


        // Sets player level to lobby
        if(Game.server.room) Game.server.room.send("change level", "1")
        Runtime.Player.setLocation(MainScene.player.x, MainScene.player.y, "1");
    }
}
