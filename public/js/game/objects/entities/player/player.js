import { readPlayerInfo } from "../../../../utils/data/playerDataHandler.js"
import { sleep } from "../../../../utils/time.js"
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
            readPlayerInfo("spriteID"),
            `${readPlayerInfo("name")}   -   [ You ]`, // Sets Player Name
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




        // Gets Closest Object to Player
        const object = this.interaction.getClosestObect(this.width)

        // Interaction Test
        if(!object) {
            this.interact = false
            if(this.interactButton != null) this.interactButton.destroy(true)
            return
        }


        if(this.interact === false){
            this.interactButton = this.scene.add.image(this.x, this.y, "interact key", 0)
            this.interactButton.setDepth(101)
            this.interact = true
        }

        if(this.interactButton != null){
            this.interactButton.x = object.body.x - ((object.body.x - this.x) / 32)
            this.interactButton.y = object.body.y - ((object.body.y - this.y) / 32)
        }



        if(this.interact === true && this.keys.E.isDown){
            this.interactButton.setTexture("interact key", 1)

            sleep(1500).then(() => this.interactButton.setTexture("interact key", 0))
        }
    }
}
