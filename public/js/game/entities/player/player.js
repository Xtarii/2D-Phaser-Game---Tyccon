import {Game, game } from "../../game.js"
import { MainScene } from "../../world/scenes/mainScene.js"
import { Entity } from "../entity.js"



/**
 * Local Player Instance
 */
export class Player extends Entity {
    /**
     * Player Previus X Position
     */
    xPos = 0
    /**
     * Player Previus Y Position
     */
    yPos = 0





    /**
     * Creates Player Instance
     */
    constructor(){
        super(
            game.scene.getScene("main"),

            // Random Position
            150 + Math.random() * (MainScene.spawnRadius - -MainScene.spawnRadius) + -MainScene.spawnRadius,
            150 + Math.random() * (MainScene.spawnRadius - -MainScene.spawnRadius) + -MainScene.spawnRadius,

            // Player Avatar
            "player"
        )
        this.xPos = this.x
        this.yPos = this.y


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

        if(this.xPos !== this.x || this.yPos !== this.y) {
            Game.server.socket.emit("update client", {x: this.x, y: this.y})
            this.xPos = this.x
            this.yPos = this.y
        }
    }
}
