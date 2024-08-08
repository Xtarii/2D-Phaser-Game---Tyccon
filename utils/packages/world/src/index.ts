import { APPDATA, BASE } from "@obesity-utils/configuration"
import fs from "fs"
import path from "path"



/**
 * Package Base Path for Files
 *
 * Base of this package at ```utils/world/.json```
 */
const BASE_FILES = path.join(BASE, "/utils/packages/world/.json/")
/**
 * APPDATA File path
 *
 * Located in ```%APPDATA%/local_data/world```
 */
const FILES = path.join(APPDATA, "local_data/world")



/**
 * Grid Position
 */
type gridPosition = {
    x: number,
    y: number
}
/**
 * Hotel Data
 *
 * Holds Data about the Hotel.
 */
type hotel = {
    /**
     * Hotel Levels
     *
     * The amount of existing
     * levels in the Hotel.
     */
    levels: number
}

/**
 * World Data
 *
 * Holds Data about the
 * ```Hotel```, parks, worlds
 * and other places that
 * is part of the Hotel.
 */
export type WorldData = {
    /**
     * Hotel Data
     */
    hotel: hotel
}



/**
 * Room Data
 *
 * Holds Data about
 * the rooms ```level```,
 * ```status```, ```enter door```,
 * ```const```.
 */
export type Room = {
    /**
     * Room Type
     *
     * The Rooms layout and size type.
     * Determents the rooms ```tilemap```.
     */
    type: "normal" | "medium" | "small" | "big" | "luxury"

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

    /**
     * Door Position
     *
     * The Position of the Door
     * to enter the Room.
     */
    door?: gridPosition
}





/**
 * Gets Room Data from Level
 *
 * Reads Rooms on {@link level} and
 * returns a object list of {@link Room}.
 *
 * @param level Hotel Floor Level
 * @returns Rooms on Floor
 */
export function getRoomsData(level: number | string) : { [key: string]: Room } {
    const original = path.join(BASE_FILES, `rooms/level${level.toString()}.json`)
    const file = path.join(FILES, `rooms/level${level.toString()}.json`)

    // Creates Copy if there is no Copy of the Room Level File
    if(!fs.existsSync(file)) {
        const data = fs.readFileSync(original, "utf8") // Original Data
        fs.mkdirSync(path.join(FILES, "rooms"), { recursive: true })
        fs.writeFileSync(file, data)
        return JSON.parse(data) // Returns Original
    }

    // Reads Room Data as Room List
    const data = JSON.parse(fs.readFileSync(file, "utf8"))
    return data
}



/**
 * Reads World Data
 *
 * If world data file does not exist
 * at ```%APPDATA%``` then this will
 * create a copy of world data file.
 *
 * @returns World Data
 */
export function getWorldData() : WorldData {
    const original = path.join(BASE_FILES, "world.json") // Original World Data File
    const file = path.join(FILES, "world.json")          // World Data Copy File

    // Creates a Copy of the Original if there is no Copy File
    if(!fs.existsSync(file)) {
        const data = fs.readFileSync(original, "utf8") // Original Data
        fs.mkdirSync(FILES, { recursive: true })
        fs.writeFileSync(file, data)
        return JSON.parse(data)
    }

    const data = JSON.parse(fs.readFileSync(file, "utf8")) // Reads Copy File
    return data
}
