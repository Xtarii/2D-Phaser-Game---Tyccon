const { sleep, Runtime, PlayerData } = require("obesity-utils")
import Player from "../../objects/entities/player/player.js"
import { Game } from "../../game.js"
import GameUI from "../../ui/UI.js"
import { level1 } from "../../scenes/hotel/hotel.js"


const {
    UI,

    addInteractableObject,

    Manager,
    Rooms,
    World,
    scenes
} = require("obesity-components")



/**
 * Main Scene
 */
export default class MainScene extends World {
    /**
     * Local Player Object
     *
     * @type {Player}
     */
    static player

    /**
     * Main Game UI Manager
     *
     * Manages UI Menus and Buttons.
     * Holds Menu UI, Player UI and more
     *
     * @type {GameUI}
     */
    static gameUI

    /**
     * Main Scene Main Instance
     *
     * @type {MainScene}
     */
    static main





    /**
     * Creates Main Scene Instance
     */
    constructor(){
        super({ key: "main" }) // Sets Scene Name
        MainScene.main = this
    }


    async create(){
        this.cameras.main.setZoom(1.7) // Camera Zoom


        // Test Button ( PC )
        const testComputer_HotelManager = this.add.sprite(2900, 2900, "player")
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


        /// Room Change Test
        Rooms.events.on("enter", (room) => {
            console.log("Enters...")
            console.log(room)

            /// Room Name
            /// The Room Scene Name should be "room_id"
            ///
            /// Example: loading room A1 ( first room ) = "room_A1"
            ///
            /// DEBUG
            console.log("Loads Room: room_" + room.name)

            /// We need that scene
            /// but then we can just do "this.loadScene(`room_${room.name}`)"
        })






        MainScene.player = new Player()
        MainScene.gameUI = new GameUI(this) // Game UI

        moneyGetter()



        /// Creates a test scene - Level 1
        ///
        /// Takes the tilemap name: "hotel tilemap" - from preload
        /// Takes a tileset: "Hotel tiles" - custom id, "hotel tileset" - from preload
        const scene = new level1("hotel tilemap", {tileName: "Hotel tiles", key: "hotel tileset"})
        scenes.add("hotel 1", scene)
        this.loadScene("hotel 1")



        this.cameras.main.startFollow(MainScene.player, true, 0.07, 0.07) // Camera Follow Player with small Delay
    }

    update(){
        if(Game.server === undefined || Game.server.room === undefined) return // Returns if no Server Connection

        MainScene.player.update()



        // TEST HUD UPDATE
        MainScene.gameUI.gameHUD.money.setText(Runtime.Player.getMoney() + " B")
        MainScene.gameUI.gameHUD.money.x = 450 - MainScene.gameUI.gameHUD.money.displayWidth



        // UI Update
        const uis = UI.getUIComponents()
        for(var x in uis) uis[x].update() // Updates UI
    }
}





/**
 * Checks if important Game Instances are loaded
 *
 * Will keep on running until all instances are loaded
 */
export async function checkGameInstances() {
    let loaded = false // Instances Loaded check

    // Check if Instances Exists
    while(true){
        if(MainScene.player !== undefined) loaded = true // Player Object

        // Exit Function
        if(loaded) break
        await sleep(1000) // Timeout 1 second
    }
}




async function moneyGetter() {
    const data = PlayerData.readPlayerData()
    if(data.data.money) Runtime.Player.setMoney(data.data.money) // Sets to saved Money


    // Runs a Money adder loop that gives 100 B per minute
    while(true) {
        await sleep(60 * 1000)
        Runtime.Player.setMoney(Runtime.Player.getMoney() + 100)
        PlayerData.storePlayerData(PlayerData.readPlayerData()) // Saves Player Progress
    }
}





global.tp = (x, y) => MainScene.player.setPosition(x, y)
