import path from "path"
import fs from "fs"



/**
 * File Related Error
 */
export class FileError extends Error {
}



/**
 * Application Root Folder in Appdata
 *
 * Located in ```%APPDATA%/obesity-hotel/```
 */
export const APPDATA = path.join(
    //      Windows             Linux         None
    process.env.APPDATA || process.env.HOME || "",
    "obesity-hotel"
)





/**
 * Reads Config File
 *
 * Config Name should be without extension,
 * so if reading config file ```foo.json``` - name should then be
 * ```foo```.
 *
 * Reads Config files from {@link APPDATA}/.configs/.
 *
 * @param name Config File Name
 * @param encode Encode Type
 * @returns Config
 * @throws File Not Found
 */
export function readApplicationConfig<T>(name: string, encode?: BufferEncoding) : T {
    // Config Folder + Config Name
    const CONFIG = path.join(APPDATA, ".configs", (name + ".json"))
    if(!fs.existsSync(CONFIG)) throw new FileError("Config file not found : " + name) // File Error

    // Reads File
    const data: T = JSON.parse(fs.readFileSync(CONFIG, encode || "utf8"))
    return data
}
