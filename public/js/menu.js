document.getElementById("connect").addEventListener("click", () => {
    localStorage.setItem("game", document.getElementById("server").value)
    location.href = "/game"
})
