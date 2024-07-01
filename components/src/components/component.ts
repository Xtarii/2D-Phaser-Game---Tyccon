/**
 * Base Component Class
 *
 * Components Should build on this class.
 */
export abstract class Component {
    /**
     * Component Parent Reference
     */
    protected parent: Phaser.GameObjects.GameObject



    /**
     * Creates Component Instance
     *
     * This Component Instance is
     * linked to ```parent```.
     *
     * @param parent Component Parent
     */
    constructor(parent: Phaser.GameObjects.GameObject){
        this.parent = parent // Sets Component Parent
    }



    /**
     * Component Start
     *
     * Called once when this
     * component is added to an object.
     */
    start = () => {}

    /**
     * Component Update
     *
     * Called every frame
     */
    update = () => {}

    /**
     * Component End
     *
     * Called once when this
     * component is removed.
     */
    end = () => {}
}
