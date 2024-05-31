document.getElementById("connect").addEventListener("click", () => {
    // Player Info
    let name = document.getElementById("name").value
    let spriteID = document.getElementById("spriteID").value

    localStorage.setItem("playerName", name === "" ? ("Dummy" + Math.random() * (100 - 10) + 10) : name)
    localStorage.setItem("spriteID", spriteID === "" ? "player" : spriteID)


    // Game Start
    localStorage.setItem("host", document.getElementById("server").value)
    location.href = "/game"
})
