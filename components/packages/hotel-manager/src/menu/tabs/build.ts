import { Button, Image, styles, TextButton, TINT } from "@obesity-components/gui"
import { Tab } from "../tab"
import { margin, UISizes } from "../menu"
import { getRoomsData, Room, sleep } from "obesity-utils"



/**
 * Build Tab
 */
export default class Build extends Tab.TabObject {
    /**
     * Room Build Buttons
     */
    roomButtons: { base: Button, icon: Image }[] = []



    open() : void {
        // Gets Room Build Data
        const rooms = getRoomsData(1)

        // Show Build Options
        let index = 0 // Margin Index
        for(let i in rooms) {
            const id = i // Room ID
            const room = rooms[id] // Room Data

            const button = this.createRoomButton(id, room, index) // Creates Button
            this.parent.add(button.base)       // Adds to Parent
            this.parent.add(button.icon)       // Adds Icon to Parent
            this.roomButtons.push({ base: button.base, icon: button.icon }) // Adds to List
            this.buildButtonClickEvent(button, room) // Button Click Event
            index++ // Adds to Margin
        }
    }

    close() : void {
        for(const button of this.roomButtons) {
            // Destroys Button
            button.base.destroy()
            button.icon.destroy()
        }
        this.roomButtons = [] // Sets Room Buttons List to Empty
    }





    /**
     * Creates Text label ( room name ) for Button
     *
     * The label returned contains the data
     * passed, ```Building``` if room is
     * currently being edited ( built or upgraded )
     * or room level and room build/upgrade cost.
     *
     * @param data Room Data
     * @returns Button Text
     */
    private roomName(data: { id: string, cost?: number, level?: number }) : string {
        let name = data.id // Base Name
        if(data.level) name += " lvl." + data.level
        if(data.cost) name += " " + data.cost + "B" // Belly Coins
        if(!data.level && !data.cost) name += " Building"
        return name // Returns Name
    }

    /**
     * Creates Room Build Button
     *
     * @param id Rooms ID
     * @param room Room Data
     * @param index Index
     * @returns Button
     */
    private createRoomButton(id: string, room: Room, index: number) : { base: Button, icon: Image } {
        // Room Data
        const x = margin + (index * UISizes.roomButton.x) + 5 // Base + Offset + Margin
        const y = 100

        // Base Button
        const button = new TextButton( // Button Instance
            this.roomName({ id, cost: room.cost, level: room.level }),
            this.parent.scene, x, y, "interact key", undefined, undefined,
            { style: styles.BUTTON_MEDIUM_SIZE }
        )
        button.sprite.setDisplaySize(UISizes.roomButton.x, UISizes.roomButton.y) // Button Size
        button.text.x = (x - UISizes.roomButton.x / 2) + UISizes.roomIcon.x + 10 // Text Position
        return {
            base: button,
            icon: this.createIconImage(
                (x - UISizes.roomButton.x / 2) + UISizes.roomIcon.x, y, "interact key")
        }
    }

    /**
     * Creates Button Icon
     *
     * @param x X Position
     * @param y Y Position
     * @param icon Icon Name
     * @returns Icon
     */
    private createIconImage(x: number, y: number, icon: string) : Image {
        const image = new Image(this.parent.scene, x, y, icon)
        image.sprite.setDisplaySize(UISizes.roomIcon.x, UISizes.roomIcon.y) // Image Size
        return image // Returns Image
    }



    /**
     * Creates a Build Click Event
     *
     * Creates a click event for the
     * button - handling room build
     * options.
     *
     * @param button Button Object
     * @param room Room
     */
    private buildButtonClickEvent(button: { base: Button, icon: Image }, room: Room) {
        button.base.addButtonClickCallback(() => {
            button.icon.setTint(TINT.NORMAL_TINT) // Icon TINT

            console.log(room)

            sleep(250).then(() => button.icon.clearTint()) // Clears Tint
        })
    }
}
