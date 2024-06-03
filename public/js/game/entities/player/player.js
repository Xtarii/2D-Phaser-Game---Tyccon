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
            150 + Math.random() * (200 - -200) + -200,
            150 + Math.random() * (200 - -200) + -200,

            // Player Avatar
            localStorage.getItem("spriteID"),
            `${localStorage.getItem("playerName")}   -   [ You ]`, // Sets Player Name
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
