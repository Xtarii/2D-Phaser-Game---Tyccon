import { game } from "../game.js"



/**
 * Local Player Instance
 */
export class Player {
    /**
     * Creates Player Instance
     */
    constructor(){
        this.body = game.scene.scenes[0].physics.add.sprite(100, 100, "player")


        this.xSide = 1
        this.ySide = 1
    }



    update(){
        this.body.setVelocityX(1.5 * 100 * this.xSide)
        this.body.setVelocityY(1.5 * 100 * this.ySide)

        if(this.body.x + 32 > 800) this.xSide = -1
        if(this.body.x - 32 < 0) this.xSide = 1

        if(this.body.y + 32 > 600) this.ySide = -1
        if(this.body.y - 32 < 0) this.ySide = 1
    }
}
