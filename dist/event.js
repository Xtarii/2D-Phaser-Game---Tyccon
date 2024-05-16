"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
/**
 * Event Emitter Class
 */
var EventEmitter = /** @class */ (function () {
    /**
     * Creates Event Emitter Instance
     */
    function EventEmitter() {
        this.listeners = {};
    }
    EventEmitter.prototype.on = function (event, callback) {
        this.listeners[event] = (this.listeners[event] || []).concat(callback);
    };
    EventEmitter.prototype.emit = function (event, params) {
        (this.listeners[event] || []).forEach(function (callback) { return callback(params); });
    };
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;
