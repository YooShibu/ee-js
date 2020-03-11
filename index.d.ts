type EventType = string | Symbol;
type EventListener = (...args: any[]) => void;
type WildCardListener = (event: string, ...args: any[]) => void

declare class EventEmitter {
    addListener(event: EventType, listener: EventListener): EventEmitter;
    addListener(event: "*", listener: WildCardListener): EventEmitter;

    /**
     * Add a listener for the given event.
     */
    on(event: EventType, listener: EventListener): EventEmitter;
    /**
     * Add a listener for the wild card event.
     */
    on(event: "*", listener: WildCardListener): EventEmitter;

    /**
     * Add an one-time listener for the given event.
     */
    once(event: EventType, listener: EventListener): EventEmitter;
    /**
     * Add an one-time listener for the wild card event.
     */
    once(event: "*", listener: WildCardListener): EventEmitter;

    emit(event: EventType, ...args: any[]): boolean;

    removeListener(event: EventType, listener: EventListener): EventEmitter;
    removeListener(event: "*", listener: WildCardListener): EventEmitter;

    /**
     * Remove the listeners of the given event.
     */
    off(event: EventType, listener: EventListener): EventEmitter;
    /**
     * Remove the listeners of the wild card event.
     */
    off(event: "*", listener: WildCardListener): EventEmitter;

    /**
     * Remove all listeners of the given event.
     */
    removeAllListener(event: EventType): EventEmitter;
    /**
     * Remove all listeners of the wild card event.
     */
    removeAllListener(event: "*"): EventEmitter;
    /**
     * Remove all listeners.
     */
    removeAllListener(): EventEmitter;

    listenerCount(event: EventType): number;
    listenerCount(event: "*"): number;
}

export = EventEmitter;