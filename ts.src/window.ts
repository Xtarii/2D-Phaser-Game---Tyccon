import { BrowserWindow } from "electron";
import { Emitter, EventEmitter } from "./event";



export class Window extends BrowserWindow {
    public eventHandler: Emitter<{
        start: Buffer | string;
        end: undefined;
    }>


    constructor(){
        super()
        this.eventHandler = new EventEmitter() // Creates Event Handler
    }
}
