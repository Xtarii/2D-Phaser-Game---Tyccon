const Phaser = require("phaser")
const { sleep } = require("obesity-utils")
import Player from "../../objects/entities/player/player.js"
import { Game } from "../../game.js"
import GameUI from "../../ui/UI.js"


const { UI, addInteractableObject, Manager } = require("obesity-components")



/**
 * Main Scene
 */
export default class MainScene extends Phaser.Scene {
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
     * Creates Main Scene Instance
     */
    constructor(){
        super({ key: "main" }) // Sets Scene Name
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






        MainScene.player = new Player()
        MainScene.gameUI = new GameUI(this) // Game UI

        const map = this.make.tilemap({key: "hotel tilemap"})
        const tiles = map.addTilesetImage("Hotel tiles", "hotel tileset")
        const ground = map.createLayer("ground", tiles)


        const wall = map.createLayer("wall", tiles)
        this.physics.add.collider(MainScene.player, wall) // Collision
        wall.setCollisionBetween(0, 100)


        const dec = map.createLayer("decoration", tiles)

        this.cameras.main.startFollow(MainScene.player, true, 0.07, 0.07) // Camera Follow Player with small Delay

        // Camera Bound ( Can't move outside this point ) set to map size + margin
        this.cameras.main.setBounds(-15, -15, ground.width + 30, ground.height + 30)
    }

    update(){
        if(Game.server === undefined || Game.server.room === undefined) return // Returns if no Server Connection

        MainScene.player.update()



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
