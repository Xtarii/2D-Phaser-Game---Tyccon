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
        super(game.scene.scenes[0], 100, 100, "player")
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)


        this.setCollideWorldBounds(true)
    }



    update(){
    }
}
