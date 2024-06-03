document.getElementById("connect").addEventListener("click", () => {
    // Player Info
    let name = document.getElementById("name").value
    let spriteID = document.getElementById("spriteID").value

    localStorage.setItem("playerName", name === "" ? ("Dummy" + Math.ceil(Math.random() * (1000 - 1 ) + 1)) : name)
    localStorage.setItem("spriteID", spriteID === "" ? "player" : spriteID)


    // Game Start
    localStorage.setItem("host", document.getElementById("server").value)
    location.href = "/game"
})
