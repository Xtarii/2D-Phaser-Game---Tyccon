import { Physics } from "phaser"



/**
 * Entity Name Space
 */
export namespace Entity {
    /**
     * Entity Base Class
     */
    export class BaseEntity extends Physics.Arcade.Sprite {
        /**
         * Entity Speed
         */
        speed: number = 75
        /**
         * Entity damp speed
         *
         * Damping Entity speed, to deley abropt stop
        */
        dampSpeed: number = 0.7

        /**
         * Entity Name Bar
         */
        namebar



        /**
         * Creates Entity Instance
         *
         * - Creates Body
         * - Creates Name Display
         *
         * @param scene Game Scene
         * @param x X position
         * @param y Y position
         * @param spriteID Sprite ID
         * @param frame Sprite Frame
         * @param name Entity Name
         * @param depth Render Depth
         */
        constructor(scene: Phaser.Scene, x: number, y: number, spriteID: string, frame?: number, name?: string, depth?: number){
            super(scene, x, y, spriteID, frame) // Creates Entity

            // Adds to Scene
            scene.add.existing(this)
            scene.physics.add.existing(this)

            // Collider Setup
            const size = this.getBounds()
            const width = size.width / 3
            const height = size.height / 2

            this.body?.setSize((size.width - width), (size.height - height))
            this.body?.setOffset(width / 2, height)


            this.name = name ?? "" // Sets Name
            this.setDepth(depth ?? 0) // Sets Render Depth





            // WORK (IN/LE) PROCESS
            const style = {
                fontSize: '50px',
                fontFamily: 'Arial',
                color: '#cfcfcf',
                backgroundColor: '#2d2f2e5e'
            }
            const nameDisplayConfig = {
                padding: {
                    x: 50,
                    y: 5
                },
                text: name,
                style: style
            }
            this.namebar = scene.make.text(nameDisplayConfig)
            this.namebar.setDepth(99)
            this.namebar.setScale(0.13, 0.13)

            this.namebar.x = this.x - (this.namebar.displayWidth / 2) // X Position
            this.namebar.y = this.y - (this.height - this.height / 4) // Y Position
        }



        update() {
            this.namebar.x = this.x - (this.namebar.displayWidth / 2)
            this.namebar.y = this.y - (this.height - this.height / 4)
        }
    }
}
