import { Game } from "../../game.js"
import Entity from "../entity.js"



/**
 * Local Player Instance
 */
export default class Player extends Entity {
    /**
     * Player Previus X Position
     */
    prevX = 0
    /**
     * Player Previus Y Position
     */
    prevY = 0





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
            localStorage.getItem("spriteID")
        )
        this.name = localStorage.getItem("playerName") // Sets Player Name
        this.prevX = this.x
        this.prevY = this.y

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)


        // Collider Size
        const size = this.getBounds()
        const x = size.width / 3
        const y = size.height / 2

        this.body.setSize((size.width - x), (size.height - y))
        this.body.setOffset(x / 2, y)


        this.setDepth(100) // Sets Player to Front
        this.keys = this.scene.input.keyboard.addKeys("W,S,A,D")




        /**
         * Player Name Test
         */
        const style = {
            fontSize: '50px',
            fontFamily: 'Arial',
            color: '#ffffff',
            backgroundColor: '#2d2f2e5e'
        }
        const nameDisplayConfig = {
            x: this.x - this.width / 2,
            y: this.y - (this.height - this.height / 4),
            padding: {
                x: 50,
                y: 5
            },
            text: `${this.name}   -   [ You ]`,
            style: style
        }
        this.nameBrick = Game.scene.getScene("main").make.text(nameDisplayConfig)
        this.nameBrick.setDepth(99)
        this.nameBrick.setScale(0.13, 0.13)
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





        /**
         * Text Test Update
         */
        this.nameBrick.x = this.x - this.width / 2
        this.nameBrick.y = this.y - (this.height - this.height / 4)
    }
}
