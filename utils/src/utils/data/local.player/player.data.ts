import path from "path"
import fs from "fs"
import { APPDATA } from "../../configs"





/**
 * Player Data Handlers
 */
export namespace PlayerData {
    /**
     * Player Data PATH
     *
     * ```%APPDATA%/local_data/```
     */
    const PATH = path.join(APPDATA, "local_data/local.player/")

    /**
     * Player Data Type
     */
    export type Player = {
        /**
         * Player Name
         */
        name: string

        /**
         * Player Sprite ID
         */
        spriteID: string
    }



    /**
     * Reads Player Data
     *
     * If no player data file found,
     * then this will create that file
     * and return default data.
     *
     * @returns Player Data
     */
    export function readPlayerData() : Player {
        const FILE = path.join(PATH, "player.data.json") // Data File

        // Default Player Data
        const defaultData: Player = {
            name: ("Dummy" + Math.ceil(Math.random() * (1000 - 1 ) + 1)),
            spriteID: "player"
        }


        // Looks for "PATH"
        if(!fs.existsSync(PATH)) fs.mkdirSync(PATH, { recursive: true })

        // Looks for "FILE"
        if(!fs.existsSync(FILE)) {
            // Creates File and writes defualt data
            fs.writeFile(FILE, JSON.stringify(defaultData, null, 2), (err) => {
                if(err) console.log("[ ERROR ] : " + err)
            })

            return defaultData // Return Defualt Data
        }

        const data: Player = JSON.parse(fs.readFileSync(FILE, "utf8")) // Reads Data
        return data // Returns Data
    }

    /**
     * Stores Player Data
     *
     * If no values in player data,
     * then this will select default values.
     *
     * @param data Player Data
     */
    export function storePlayerData(data: Player){
        const FILE = path.join(PATH, "player.data.json") // Data File

        // Player Data
        const playerData: Player = {
            name: data.name === "" ? ("Dummy" + Math.ceil(Math.random() * (1000 - 1 ) + 1)) : data.name,
            spriteID: data.spriteID === "" ? "player" : data.spriteID
        }

        // Looks for PATH
        if(!fs.existsSync(PATH)) fs.mkdirSync(PATH, { recursive: true })

        // Writes Data to file even if it does not exist
        fs.writeFile(FILE, JSON.stringify(playerData, null, 2), "utf8", (err) => {
            if(err) console.log("[ ERROR ] : " + err)
        })
    }
}
