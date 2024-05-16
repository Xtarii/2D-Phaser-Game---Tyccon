const w = require("./dist/window")



console.log("Start")

const win = new w.Window()


// DEBUG
console.log("listening for event...")
win.eventHandler.on("start", (data) => console.log(data))


win.eventHandler.emit("start", "Hello World")
