import Phaser from "phaser"



/**
 * Base Component Class
 *
 * Components Should build on this class.
 */
export abstract class Component {
    /**
     * Component Parent Reference
     */
    protected parent: Phaser.GameObjects.Sprite

    /**
     * Component Run Mode
     */
    private _run: boolean = true



    /**
     * Creates Component Instance
     *
     * This Component Instance is
     * linked to ```parent```.
     *
     * @param parent Component Parent
     */
    constructor(parent: Phaser.GameObjects.Sprite){
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





    /**
     * Component Run Mode
     *
     * If false this component will not be called in update.
     * By default this is true ( this will run this component ).
     */
    set run(status: boolean) { this._run = status }
    get run(): boolean { return this._run }
}





/// THIS WILL BE UPDATED \\\
export * from "./interaction/interactable"
export * from "./interaction/interaction"

export * from "./buildmode/buildmode"
/// <------------------> \\\
