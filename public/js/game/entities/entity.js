const { Physics } = require("phaser")



/**
 * Entity Base Class
 */
export default class Entity extends Physics.Arcade.Sprite {
    /**
     * Entity Speed
     */
    speed = 75
    /**
     * Entity damp speed
     *
     * Damping Entity speed, to deley abropt stop
    */
    dampSpeed = 0.7


    /**
     * Entity Name
     */
    name = "Entity"





    /**
     * Creates Entity Instance
     *
     * - Creates Body
     * - Creates Name Display
     *
     * @param {Phaser.Scene} scene Game Scene
     * @param {number} x X Position
     * @param {number} y Y Position
     * @param {string} spriteID Sprite ID
     * @param {string} name Entity Name
     * @param {number} depth Entity render Depth
     */
    constructor(scene, x, y, spriteID, name, detph){
        super(scene, x, y, spriteID) // Creating parent(PAPPA)

        // Add to scene
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        // Collider setup
        const size = this.getBounds()
        const width = size.width / 3
        const height = size.height / 2

        this.body.setSize((size.width - width), (size.height - height))
        this.body.setOffset(width / 2, height)
        this.setDepth(detph) // Sets Entity render detph






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
        this.namebar = Game.scene.getScene("main").make.text(nameDisplayConfig)
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
