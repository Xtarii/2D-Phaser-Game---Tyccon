/**
 * Event Map
 */
type EventMap = Record<string, any>

/**
 * Event Key
 */
type EventKey<T extends EventMap> = string & keyof T

/**
 * Event Reciver
 */
type EventReciver<T> = (params: T) => void



/**
 * Event Interface
 */
export interface Emitter<T extends EventMap> {
    /**
     * On Event call
     *
     * Gets Called when Event is Emitted with {@link event}
     * and calls {@link callback}
     *
     * @param event Event Name
     * @param callback Callback Function
     */
    on<K extends EventKey<T>>(event: K, callback: EventReciver<T[K]>): void

    /**
     * Emits Event
     *
     * Emits Event with {@link params} as data
     *
     * @param event Event Name
     * @param params Event Parameters
     */
    emit<K extends EventKey<T>>(event: K, params: T[K]): void
}



/**
 * Event Emitter Class
 */
export class EventEmitter<T extends EventMap> implements Emitter<T> {
    /**
     * Registerd Event Listeners
     */
    private listeners: {
        [K in keyof EventMap]?: Array<(p: EventMap[K]) => void>
    }

    /**
     * Creates Event Emitter Instance
     */
    constructor(){
        this.listeners = {}
    }

    on<K extends EventKey<T>>(event: K, callback: EventReciver<T[K]>): void {
        this.listeners[event] = (this.listeners[event] || []).concat(callback)
    }
    emit<K extends EventKey<T>>(event: K, params: T[K]): void {
        (this.listeners[event] || []).forEach((callback) => callback(params))
    }
}
