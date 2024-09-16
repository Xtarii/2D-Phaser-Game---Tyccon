const path = require("path")
const { PlayerData, BASE, Runtime } =  require("obesity-utils")



// Reads Player Info
const playerData = PlayerData.readPlayerData()

// Applies Data to Front-end Inputs
document.getElementById("name").value = playerData.name
document.getElementById("spriteID").value = playerData.spriteID



// Play : Single Player
document.getElementById("play:singleplayer").addEventListener("click", () =>
    startGame())
// Play : Multiplayer
document.getElementById("play:multiplayer").addEventListener("click", () =>
    startGame(document.getElementById("server").value))




/**
 * Gets Player Data from the GUI
 *
 * Will only get entered player data,
 * that is data from the client.ss
 *
 * @returns Player Data : Name and Sprite ID
 */
function getPlayerDataFromGUI() {
    // Player Info
    const name = document.getElementById("name").value
    const spriteID = document.getElementById("spriteID").value
    return { name, spriteID }
}


/**
 * Starts Game
 *
 * Saves Player Data and starts the Game.
 *
 * @param {string | null} host Server Host Address
 */
function startGame(host) {
    if(playerData.data && playerData.data.money !== undefined) Runtime.Player.setMoney(playerData.data.money)
    const {name, spriteID} = getPlayerDataFromGUI()
    PlayerData.storePlayerData({ name, spriteID }) // Stores Player Data

    // Connects to Game
    Runtime.Server.setAddress(host)
    location.href = path.join(BASE, "/application/pages/game.html")
}
