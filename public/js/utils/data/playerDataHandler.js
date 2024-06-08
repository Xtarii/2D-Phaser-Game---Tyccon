/**
 * Reads Data from Player Info
 *
 * @param {string} key Key
 * @returns Data
 */
export function readPlayerInfo(key) {
    const data = JSON.parse(localStorage.getItem("player info")) // Reads Player Info
    if(data === null) return null
    return data[key]
}
