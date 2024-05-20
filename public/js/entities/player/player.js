import { Game, game } from "../../game.js"
import { Entity } from "../entity.js"



/**
 * Local Player Instance
 */
export class Player extends Entity {
    /**
     * Creates Player Instance
     */
    constructor(){
        super(game.scene.scenes[0], 100, 100, "player")

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)


        this.setCollideWorldBounds(true)


        this.keys = this.scene.input.keyboard.addKeys("W,S,A,D")
    }



    update(){
        if(this.keys.W.isDown) this.setVelocityY(-this.speed)
        if(this.keys.S.isDown) this.setVelocityY(this.speed)

        if(this.keys.A.isDown) this.setVelocityX(-this.speed)
        if(this.keys.D.isDown) this.setVelocityX(this.speed)
    }
}
