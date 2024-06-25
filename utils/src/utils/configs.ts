import path from "path"
import fs from "fs"



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
 */
export function readApplicationConfig<T>(name: string, encode?: BufferEncoding) : T | null {
    // Config Folder + Config Name
    const CONFIG = path.join(APPDATA, ".configs", (name + ".json"))
    if(!fs.existsSync(CONFIG)) return null // Checks if File Exists

    // Reads File
    const data: T = JSON.parse(fs.readFileSync(CONFIG, encode || "utf8"))
    return data
}
