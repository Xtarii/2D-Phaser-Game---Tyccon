const { PlayerData, sleep, Runtime } = require("obesity-utils")
const {
    Entity,
    Interact,

    TextButton,
    TINT,
    PlacementType,
    WorldManager
} = require("obesity-components")

import { Game } from "../../../game.js"



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
            0,
            0,
            1, // First Level ( Lobby )

            // Player Avatar
            PlayerData.readPlayerData().spriteID, null,
            `${PlayerData.readPlayerData().name}   -   [ You ]`, // Sets Player Name
            100 // Player depth
        )
        Runtime.Player.setLocation(this.x, this.y, this.level) // Sets Location

        WorldManager.addCollidable(this)    // Adds this as collidable
        WorldManager.removeRemovable(this)  // Makes Player stay when loading a new Scene
        this.canMove = true // Player Can Move
        this.keys = this.scene.input.keyboard.addKeys("W,S,A,D,E") // Key Listeners





        // Component Setup
        this.interaction = this.addComponent(Interact, this.width)



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
                this.interactButton = new TextButton("E", this.scene, x, y, "interact key", null, PlacementType.dynamic)
            }
        })
        this.interaction.event.on("no interaction", () => {
            this.interactButton?.destroy()
            this.interactButton = null
        })
    }



    update(){
        // Movement
        this.setVelocityX(this.body.velocity.x * this.dampSpeed)
        this.setVelocityY(this.body.velocity.y * this.dampSpeed)

        if(this.canMove){ // Player Input ( Movement )
            if(this.keys.W.isDown) this.setVelocityY(-this.speed)
            if(this.keys.S.isDown) this.setVelocityY(this.speed)

            if(this.keys.A.isDown) this.setVelocityX(-this.speed)
            if(this.keys.D.isDown) this.setVelocityX(this.speed)
        }

        // Updates player position
        Runtime.Player.setLocation(this.x, this.y, this.level)
        Game.server.room.send("update player", Runtime.Player.getLocation())




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
