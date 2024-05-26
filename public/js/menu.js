document.getElementById("connect").addEventListener("click", () => {
    localStorage.setItem("host", document.getElementById("server").value)
    location.href = "/game"
})
