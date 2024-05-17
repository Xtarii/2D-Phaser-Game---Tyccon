const { app, BrowserWindow } = require("electron")
const { Application } = require("./dist/window")



/**
 * Base Application Instance
 */
let application



// App Start
app.whenReady().then(() => {
    console.log("Starting...")

    // Creates Window
    application = new Application()

    // Activate Event
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            console.log("[ No Window was created ] :: Creates Window")

            // Creating window
            application = new Application()
        }
    })
})

// Window Close Event
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        console.log("Stoping...")

        app.quit() // Exits app
    }
})
