import { readPlayerInfo } from "../../../utils/data/playerDataHandler.js"
import { Game } from "../../game.js"
import Entity from "../entity.js"



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
            0 + Math.random() * ((64 * 3) - -(64 * 3)) + -(64 * 3),
            2900 + Math.random() * ((64 * 3) - -(64 * 3)) + -(64 * 3),

            // Player Avatar
            readPlayerInfo("spriteID"),
            `${readPlayerInfo("name")}   -   [ You ]`, // Sets Player Name
            100 // Player detph
        )

        // Key Listeners
        this.keys = this.scene.input.keyboard.addKeys("W,S,A,D")
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
    }
}
