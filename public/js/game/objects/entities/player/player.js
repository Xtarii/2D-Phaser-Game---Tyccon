import { readPlayerInfo } from "../../../../utils/data/playerDataHandler.js"
import { Game } from "../../../game.js"
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
            0 + Math.random() * ((64 * 2) - -(64 * 2)) + -(64 * 2),
            2900 + Math.random() * ((64 * 2) - -(64 * 2)) + -(64 * 2),

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




        // Interaction Test
        const obj = this.findClosestObect()
        if(obj === (null || undefined)) {
            this.interact = false
            if(this.interactButton !== (null || undefined)) this.interactButton.destroy(true)
            return
        }


        if(this.interact === false){
            this.interactButton = this.scene.add.image(this.x, this.y, "interact key", 0)
            this.interactButton.setDepth(101)
            this.interact = true
        }

        if(this.interactButton !== (null || undefined)){
            this.interactButton.x = obj.obj.x
            this.interactButton.y = obj.obj.y
        }
    }




    findClosestObect = () => {
        // Find Objects In scene
        const objects = Game.scene.getScene("main").children.list
        const closest = []


        for(var i in objects){
            // Checks if Interactable
            if(objects[i].interactable === (null || undefined) || objects[i].interactable === false) continue

            // Handles Interactable Objects
            const distance = Math.sqrt(
                Math.pow(objects[i].x - this.x, 2) + Math.pow(objects[i].y - this.y, 2)
            )

            if(distance < 1 * 64)
                closest.push({obj: objects[i], distance})
        }

        // Return Closest Object
        closest.sort((a, b) => a.distance - b.distance)
        return closest[0]
    }
}
