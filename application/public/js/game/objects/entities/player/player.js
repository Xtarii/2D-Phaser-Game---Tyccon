const { PlayerData } = require("@obesity/utils")

import { Game } from "../../../game.js"
import Entity from "../entity.js"
import InteractionHandler from "./interact.js"



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
            PlayerData.readPlayerData().spriteID,
            `${PlayerData.readPlayerData().name}   -   [ You ]`, // Sets Player Name
            100 // Player detph
        )

        // Key Listeners
        this.keys = this.scene.input.keyboard.addKeys("W,S,A,D,E")


        // Component Setup
        this.interaction = new InteractionHandler(this)
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




        super.update()




        // Player Interactions
        this.interaction.handleInteractions(this.width)
    }
}
