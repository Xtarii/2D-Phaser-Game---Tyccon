import { Button, Image, styles, TextButton, TINT } from "@obesity-components/gui"
import { Tab } from "../tab"
import { margin, UISizes } from "../menu"
import { getRoomsData, Room, Runtime, sleep } from "obesity-utils"
import { Rooms } from "@obesity-components/room-manager"



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
        const rooms = getRoomsData(1) // FIX TO CURRENT LEVEL

        // Show Build Options
        let index = 0 // Margin Index
        for(let i in rooms) {
            const id = i // Room ID
            const room = rooms[id] // Room Data

            const button = this.createRoomButton(id, room, index) // Creates Button
            this.parent.add(button.base)       // Adds to Parent
            this.parent.add(button.icon)       // Adds Icon to Parent
            this.roomButtons.push({ base: button.base, icon: button.icon }) // Adds to List
            this.buildButtonClickEvent(button, {name: id, room }) // Button Click Event
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

        // Max Level
        if(data.level && data.level >= 3) return name += " max"

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
     * @param data Room
     */
    private buildButtonClickEvent(button: { base: Button, icon: Image }, data: { name: string, room: Room }) {
        button.base.addButtonClickCallback(() => {
            button.icon.setTint(TINT.NORMAL_TINT) // Icon TINT

            // Checks if Room Cost Exists and if Player has enough money ( Belly Coins )
            if(data.room.cost && Runtime.Player.getMoney() >= data.room.cost && data.room.level && data.room.level < 3) {
                Runtime.Player.setMoney(Runtime.Player.getMoney() - data.room.cost)

                // Build or Upgrade Room
                try{
                    Rooms.buildRoom(this.parent.scene, data)
                }catch(err) {
                    Rooms.upgradeRoom(data.name, (data.room.level ?? 1) + 1)
                }


                // Updates Button Text
                const text = (button.base as TextButton)
                const newRoomData = getRoomsData(1)[data.name] // Fix to Current Level
                text.setText(this.roomName({id: data.name, cost: newRoomData.cost, level: newRoomData.level}))
            }

            sleep(250).then(() => button.icon.clearTint()) // Icon Tint Clear When Button stops interaction
        })
    }
}
