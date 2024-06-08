import { readPlayerInfo } from "./utils/data/playerDataHandler.js"



/**
 * Player Character Information
 */
const playerInfo = {
    /**
     * Player Name
     */
    name: ("Dummy" + Math.ceil(Math.random() * (1000 - 1 ) + 1)),
    /**
     * Player Sprite ID
     */
    spriteID: "player",
}

// Reads Player Info
playerInfo.name = readPlayerInfo("name") || playerInfo.name
playerInfo.spriteID = readPlayerInfo("spriteID") || playerInfo.spriteID


// Applies Data to Front-end Inputs
document.getElementById("name").value = playerInfo.name
document.getElementById("spriteID").value = playerInfo.spriteID


// Connection Event
document.getElementById("connect").addEventListener("click", () => {
    // Player Info
    let name = document.getElementById("name").value
    let spriteID = document.getElementById("spriteID").value

    playerInfo.name = name === "" ? ("Dummy" + Math.ceil(Math.random() * (1000 - 1 ) + 1)) : name
    playerInfo.spriteID = spriteID === "" ? "player" : spriteID

    localStorage.setItem("player info", JSON.stringify(playerInfo)) // Saves Player Info


    // Game Start
    localStorage.setItem("host", document.getElementById("server").value)
    location.href = "/game"
})
