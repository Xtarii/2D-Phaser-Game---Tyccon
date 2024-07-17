const { PlayerData, sleep } = require("obesity-utils")
const {
    Entity,
    Interact,

    Button,
    TINT,
    PlacementType,

    BuildMode
} = require("obesity-components")

import { Game } from "../../../game.js"
import MainScene from "../../../world/scenes/mainScene.js"



/**
 * Local Player Instance
 */
export default class Player extends Entity {
    /**
     * Creates Player Instance
     */
    constructor(){
        super(
            Game.scene.getScene("main"),

            // Prespawn Position
            0 + Math.random() * ((64 * 2) - -(64 * 2)) + -(64 * 2),
            2900 + Math.random() * ((64 * 2) - -(64 * 2)) + -(64 * 2),

            // Player Avatar
            PlayerData.readPlayerData().spriteID, null,
            `${PlayerData.readPlayerData().name}   -   [ You ]`, // Sets Player Name
            100 // Player depth
        )

        // Key Listeners
        this.keys = this.scene.input.keyboard.addKeys("W,S,A,D,E")





        // Component Setup
        this.interaction = this.addComponent(Interact, this.width)

        this.buildMode = this.addComponent(BuildMode) // Player Build Mode
        this.buildMode.run = false // Turns off build mode


        // Interaction Handling
        this.interaction.event.on("interaction", (target, callback, distance) => {
            // Gets Position between player and interact object
            const targetX = target.x
            const targetY = target.y
            const x = targetX - (targetX - this.x) / 32
            const y = targetY - (targetY - this.y) / 32

            // Updates Button Position
            if(this.interactButton) {
                this.interactButton.x = x
                this.interactButton.y = y
            }else {
                // Creates Button Instance
                this.interactButton = new Button("E", this.scene, x, y, "interact key", null, PlacementType.dynamic)
            }
        })
        this.interaction.event.on("no interaction", () => {
            this.interactButton?.destroy()
            this.interactButton = null
        })





        // Build Mode Setup
        this.buildMode.event.on("enter", () => {
            // Disables Components
            this.interaction.run = false
            this.interactButton?.destroy()
            this.interactButton = null

            // Hides Menu
            MainScene.gameUI.gameHUD.enterBuildMode()
        })
        this.buildMode.event.on("exit", () => {
            // Enables Components
            this.interaction.run = true

            // Shows Menu
            MainScene.gameUI.gameHUD.exitBuildMode()
        })
    }



    update(){
        // Movement
        this.setVelocityX(this.body.velocity.x * this.dampSpeed)
        this.setVelocityY(this.body.velocity.y * this.dampSpeed)

        if(this.keys.W.isDown) this.setVelocityY(-this.speed)
        if(this.keys.S.isDown) this.setVelocityY(this.speed)

        if(this.keys.A.isDown) this.setVelocityX(-this.speed)
        if(this.keys.D.isDown) this.setVelocityX(this.speed)

        // Updates player position
        Game.server.room.send("update player", { x: this.x, y: this.y})




        super.update() // Super Update




        // Checks for interaction Event
        if(this.interaction.target) {
            if(this.scene.input.keyboard.checkDown(this.keys.E, this.interaction.target.delay || 250)){
                /// BUTTON TEST
                this.interactButton.sprite.setTint(TINT.NORMAL_TINT)
                sleep(500).then(() => this.interactButton?.sprite.clearTint())

                // Call on Target Interact Function
                this.interaction.target.callback()
                // sleep(100).then(async () => {
                //     sleep(2900)
                // })
            }
        }
    }
}
