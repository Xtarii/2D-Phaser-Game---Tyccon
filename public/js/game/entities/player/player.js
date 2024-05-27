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
        super(game.scene.getScene("main"), 100, 100, "player")

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        // Collider Size
        const size = this.getBounds()
        const x = size.width / 3
        const y = size.height / 2

        this.body.setSize((size.width - x), (size.height - y))
        this.body.setOffset(x / 2, y)


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
