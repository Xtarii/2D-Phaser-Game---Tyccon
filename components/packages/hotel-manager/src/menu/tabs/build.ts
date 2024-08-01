import { Button } from "@obesity-components/gui"
import { Tab } from "../tab"



/**
 * Build Tab
 */
export default class Build extends Tab.TabObject {
    test: Button | null = null


    open(): void {
        // Show Build Options
        this.test = new Button(this.parent.scene, 200, 200, "interact key")
        this.test.addButtonClickCallback(() => console.log("Build new Room"))
        this.test.sprite.setDisplaySize(75, 25)
        this.parent.add(this.test)
    }

    close(): void {
        this.test?.destroy()
        this.test = null
    }
}
