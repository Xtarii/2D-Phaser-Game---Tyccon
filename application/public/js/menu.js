const { PlayerData } =  require("@obesity-utils/main")



// Reads Player Info
const playerData = PlayerData.readPlayerData()

// Applies Data to Front-end Inputs
document.getElementById("name").value = playerData.name
document.getElementById("spriteID").value = playerData.spriteID


// Connection Event
document.getElementById("connect").addEventListener("click", () => {
    // Player Info
    const name = document.getElementById("name").value
    const spriteID = document.getElementById("spriteID").value

    PlayerData.storePlayerData({ name, spriteID }) // Stores Player Data


    // Game Start
    localStorage.setItem("host", document.getElementById("server").value)
    location.href = "/game"
})
