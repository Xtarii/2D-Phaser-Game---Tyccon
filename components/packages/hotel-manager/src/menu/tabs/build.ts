import { Button, Image, TextButton, TINT } from "@obesity-components/gui"
import { Tab } from "../tab"
import { Rooms } from "@obesity-components/room-manager"
import { margin } from "../menu"
import { sleep } from "obesity-utils"



/**
 * Build Tab
 */
export default class Build extends Tab.TabObject {
    roomButtons: Button[] = []

    /**
     * UI Size Collection
     */
    readonly UISizes = {
        /**
         * Room Button Size
         */
        roomButton: {
            x: 100,
            y: 25
        },
        /**
         * Room Icon Size
         */
        roomIcon: {
            x: 16,
            y: 16
        }
    }



    open() : void {
        // Gets Room Build Data
        const roomData = Rooms.getRoomsBuildData()

        // Show Build Options
        for(let i = 0; i < roomData.length; i++) {
            const room = roomData[i] // Gets Room

            const button = this.createRoomButton(room, i) // Creates Button
            this.parent.add(button.base)       // Adds to Parent
            this.parent.add(button.icon)       // Adds Icon to Parent
            this.roomButtons.push(button.base) // Adds to List

            button.base.addButtonClickCallback(() => {
                button.icon.setTint(TINT.NORMAL_TINT) // Button Icon Tint
                console.log(room)

                sleep(250).then(() => button.icon.clearTint()) // Clears Tint
            })
        }
    }

    close() : void {
        for(const button of this.roomButtons) button.destroy() // Destroys Button
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
        let name = data.id

        if(data.level) name += " lvl." + data.level
        if(data.cost) name += " " + data.cost + "B" // Belly Coins

        if(!data.level && !data.cost) name += " Building"

        return name // Returns Name
    }

    /**
     * Creates Room Build Button
     *
     * @param room Room Data
     * @param index Index
     * @returns Button
     */
    private createRoomButton(room: Rooms.RoomBuildData, index: number) : { base: Button, icon: Image } {
        // Room Data
        const x = margin + (index * this.UISizes.roomButton.x) + 5 // Base + Offset + Margin
        const y = 100

        // Base Button
        const button = new TextButton( // Button Instance
            this.roomName({ id: room.id, cost: room.cost, level: room.level }),
            this.parent.scene, x, y, "interact key", undefined, undefined,
            {
                style: {
                    fontSize: '7px',
                    fontFamily: 'standard galactic',
                    color: '#efefef',
                    resolution: 2
                }
            }
        )
        button.sprite.setDisplaySize(this.UISizes.roomButton.x, this.UISizes.roomButton.y) // Button Size
        button.text.x = (x - this.UISizes.roomButton.x / 2) + this.UISizes.roomIcon.x + 10 // Text Position
        return {
            base: button,
            icon: this.createIconImage(
                (x - this.UISizes.roomButton.x / 2) + this.UISizes.roomIcon.x, y, "interact key")
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
        image.sprite.setDisplaySize(this.UISizes.roomIcon.x, this.UISizes.roomIcon.y) // Image Size
        return image // Returns Image
    }
}
