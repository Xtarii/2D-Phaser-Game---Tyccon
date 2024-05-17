"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
var electron_1 = require("electron");
var event_1 = require("./event");
/**
 * Base Application
 *
 * Stores Window Instace and other important
 * window related instances
 */
var Application = /** @class */ (function () {
    /**
     * Creates Application Instance
     */
    function Application() {
        // Window Instance
        this.window = new electron_1.BrowserWindow({
            width: 1500,
            height: 800,
            // Needed for Application Functions
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            },
        });
        // this.window.removeMenu() // Debug Menu Removal
        this.events = new event_1.EventEmitter(); // Creates Event Handler
    }
    return Application;
}());
exports.Application = Application;
