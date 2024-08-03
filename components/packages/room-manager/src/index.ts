import { GameObjects } from "phaser"



export class Room extends GameObjects.Sprite {
}



export namespace Rooms {
    /**
     * Room Build Data
     *
     * Room data for the build menu,
     * holds room level, cost, id
     * and more.
     */
    export type RoomBuildData = {
        /**
         * Room Name or ID
         *
         * Used to get room data.
         */
        id: string

        /**
         * Room Status
         *
         * Can be ```built``` or ```in-build```.
         * Indicated wether the room can be
         * upgraded, built or what build
         * status it has.
         */
        status?: "built" | "in-build"

        /**
         * Room Level
         *
         * This will only have a number
         * if the room is ```built``` and
         * therefore has a level
         */
        level?: number

        /**
         * What the room cost to upgrade
         * or build.
         *
         * This will only have a number if
         * the room status is not ```in-build```.
         */
        cost?: number
    }


    export function getRoomsBuildData() : RoomBuildData[] {
        // Check if Files Exists and if not create files ( UTILS )

        // Get Room Data ( UTILS )

        // Return Room Data
        return [
            { id: "A1", status: "built", level: 1, cost: 100 },
            { id: "A2", status: "in-build" },
            { id: "A3", cost: 100 },
        ]
    }
}
