"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Window = void 0;
var event_1 = require("./event");
var Window = /** @class */ (function () {
    function Window() {
        this.eventHandler = new event_1.EventEmitter(); // Creates Event Handler
    }
    return Window;
}());
exports.Window = Window;
