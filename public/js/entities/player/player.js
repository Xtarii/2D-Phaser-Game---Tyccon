import { game } from "../../game.js"
import { Entity } from "../entity.js"



/**
 * Local Player Instance
 */
export class Player extends Entity {
    /**
     * Creates Player Instance
     */
    constructor(){
        super(game.scene.scenes[1], 100, 100, "player")

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)


        // this.setCollideWorldBounds(true)
        this.setDepth(100) // Sets Player to Front


        this.keys = this.scene.input.keyboard.addKeys("W,S,A,D")
    }



    update(){
        this.setVelocityX(this.body.velocity.x * this.dampSpeed)
        this.setVelocityY(this.body.velocity.y * this.dampSpeed)

        if(this.keys.W.isDown) this.setVelocityY(-this.speed)
        if(this.keys.S.isDown) this.setVelocityY(this.speed)

        if(this.keys.A.isDown) this.setVelocityX(-this.speed)
        if(this.keys.D.isDown) this.setVelocityX(this.speed)
    }
}
