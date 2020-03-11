'use strict'

// Why write this program with a traditional prototype style?
// This program needs to mix class and prototype.
// Example:
//     EventEmitter.prototype.addListener = EventEmitter.prototype.on
//     EmptyEmitter.prototype.count = 1
// I am writing this program with vscode.
// vscode has a function to format the code, but it will not work if class syntax and prototype style are mixed.
// Since writing using prototype style is more efficient (maybe too small to measure), I gave up writing in class syntax.

function Events() { }
/* istanbul ignore else */
if (Object.create) {
    Events.prototype = Object.create(null);
}



export default function EventEmitter() { }

EventEmitter.prototype.on = function (eventName, listener) {
    callable(listener);

    const
        events = this._events || (this._events = new Events()),
        listeners = events[eventName];

    if (listeners) {
        listeners.pushEventListener(listener);
    }
    else {
        events[eventName] = new EventListeners(listener, null);
    }

    return this;
};

EventEmitter.prototype.once = function (eventName, listener) {
    callable(listener);

    const
        events = this._events || (this._events = new Events()),
        listeners = events[eventName];

    if (listeners) {
        listeners.pushOnceListener(listener);
    }
    else {
        events[eventName] = new EventListeners(null, listener);
    }

    return this;
}

EventEmitter.prototype.emit = function (eventName, a1, a2, a3) {
    const events = this._events;

    if (!events || eventName === "*") {
        return false;
    }

    const
        anyEvent = events["*"],
        event = events[eventName],
        shouldEmitAnyEvent = !!anyEvent && anyEvent.hasListener(),
        shouldEmitEvent = !!event && event.hasListener();

    if (!shouldEmitAnyEvent && !shouldEmitEvent) {
        return false;
    }

    switch (arguments.length) {
        case 1:
            if (shouldEmitAnyEvent) {
                anyEvent.emitO1(eventName);
                anyEvent.eventListeners.emit1(eventName);
            }
            if (shouldEmitEvent) {
                event.emitO0();
                event.eventListeners.emit0();
            }
            break;
        case 2:
            if (shouldEmitAnyEvent) {
                anyEvent.emitO2(eventName, a1);
                anyEvent.eventListeners.emit2(eventName, a1);
            }
            if (shouldEmitEvent) {
                event.emitO1(a1);
                event.eventListeners.emit1(a1);
            }
            break;
        case 3:
            if (shouldEmitAnyEvent) {
                anyEvent.emitO3(eventName, a1, a2);
                anyEvent.eventListeners.emit3(eventName, a1, a2);
            }
            if (shouldEmitEvent) {
                event.emitO2(a1, a2);
                event.eventListeners.emit2(a1, a2);
            }
            break;
        case 4:
            if (shouldEmitAnyEvent) {
                anyEvent.emitO4(eventName, a1, a2, a3);
                anyEvent.eventListeners.emit4(eventName, a1, a2, a3);
            }
            if (shouldEmitEvent) {
                event.emitO3(a1, a2, a3);
                event.eventListeners.emit3(a1, a2, a3);
            }
            break;
        default:
            const args = new Array(arguments.length - 1);
            for (let i = 1; arguments.length > i; ++i) {
                args[i - 1] = arguments[i];
            }
            if (shouldEmitAnyEvent) {
                anyEvent.emitO(arguments);
                anyEvent.eventListeners.emit(arguments);
            }
            if (shouldEmitEvent) {
                event.emitO(args);
                event.eventListeners.emit(args);
            }
    }

    return true;
}

EventEmitter.prototype.listenerCount = function (eventName) {
    if (!this._events) {
        return 0;
    }

    let count = 0;

    if (this._events[eventName]) {
        count += this._events[eventName].count();
    }

    if (this._events["*"]) {
        count += this._events["*"].count();
    }

    return count;
}

EventEmitter.prototype.off = function (eventName, listener) {
    if (this._events && this._events[eventName]) {
        this._events[eventName].removeListener(listener);
    }

    return this;
}

EventEmitter.prototype.removeAllListeners = function (eventName) {
    const events = this._events;

    if (!events) {
        return this;
    }

    if (eventName === void 0) {
        for (let key in events) {
            /* istanbul ignore else */
            if (Object.prototype.hasOwnProperty.call(events, key)) {
                events[key].removeAll();
            }
        }
    }
    else if (events[eventName]) {
        events[eventName].removeAll();
    }

    return this;
}

EventEmitter.prototype.addListener = EventEmitter.prototype.on;
EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

function callable(listener) {
    if (typeof listener !== 'function') {
        throw new TypeError(`event listener must be type of 'function' but got '${typeof listener}'.`);
    }
}



function EventListeners(eventListener, onceListener) {
    this.eventListeners =
        eventListener ? new SingleEmitter(eventListener) : DummyEmitter;
    this.onceListeners =
        onceListener ? new SingleEmitter(onceListener) : DummyEmitter;
}

EventListeners.prototype.pushEventListener = function (listener) {
    this.eventListeners = this.eventListeners.push(listener);
}

EventListeners.prototype.pushOnceListener = function (listener) {
    this.onceListeners = this.onceListeners.push(listener);
}

EventListeners.prototype.hasListener = function () {
    return this.eventListeners.hasListener || this.onceListeners.hasListener;
}

EventListeners.prototype.removeListener = function (listener) {
    this.eventListeners = this.eventListeners.remove(listener);
    this.onceListeners = this.onceListeners.remove(listener);
}

EventListeners.prototype.removeAll = function () {
    this.eventListeners = this.eventListeners.removeAll();
    this.onceListeners = this.onceListeners.removeAll();
}

EventListeners.prototype.count = function () {
    return this.eventListeners.count + this.onceListeners.count;
}

EventListeners.prototype.emitO0 = function () {
    const onceListeners = this.onceListeners;
    if (onceListeners.hasListener) {
        this.onceListeners = DummyEmitter;
        this.onceListeners = onceListeners.emit0().removeAll();
    }
}

EventListeners.prototype.emitO1 = function (a1) {
    const onceListeners = this.onceListeners;
    if (onceListeners.hasListener) {
        this.onceListeners = DummyEmitter;
        this.onceListeners = onceListeners.emit1(a1).removeAll();
    }
}

EventListeners.prototype.emitO2 = function (a1, a2) {
    const onceListeners = this.onceListeners;
    if (onceListeners.hasListener) {
        this.onceListeners = DummyEmitter;
        this.onceListeners = onceListeners.emit2(a1, a2).removeAll();
    }
}

EventListeners.prototype.emitO3 = function (a1, a2, a3) {
    const onceListeners = this.onceListeners;
    if (onceListeners.hasListener) {
        this.onceListeners = DummyEmitter;
        this.onceListeners = onceListeners.emit3(a1, a2, a3).removeAll();
    }
}

EventListeners.prototype.emitO4 = function (a1, a2, a3, a4) {
    const onceListeners = this.onceListeners;
    if (onceListeners.hasListener) {
        this.onceListeners = DummyEmitter;
        this.onceListeners = onceListeners.emit4(a1, a2, a3, a4).removeAll();
    }
}

EventListeners.prototype.emitO = function (args) {
    const onceListeners = this.onceListeners;
    if (onceListeners.hasListener) {
        this.onceListeners = DummyEmitter;
        this.onceListeners = onceListeners.emit(args).removeAll();
    }
}



const DummyEmitter = {
    count: 0,
    hasListener: false,

    push(fn) {
        return new SingleEmitter(fn);
    },

    remove() {
        return DummyEmitter;
    },

    removeAll() {
        return DummyEmitter;
    },

    emit0() { return DummyEmitter; },
    emit1() { return DummyEmitter; },
    emit2() { return DummyEmitter; },
    emit3() { return DummyEmitter; },
    emit4() { return DummyEmitter; },
    emit() { return DummyEmitter; }
};



function EmptyEmitter() { }

EmptyEmitter.prototype.init = function (singleEmitter, multipleEmitters) {
    this._singleEmitter = singleEmitter;
    this._multipleEmitters = multipleEmitters;
    return this;
}

EmptyEmitter.prototype.hasListener = false;

EmptyEmitter.prototype.push = function (fn) {
    return this._singleEmitter.init(fn, this, this._multipleEmitters);
}

EmptyEmitter.prototype.remove = function () {
    return this;
}

EmptyEmitter.prototype.removeAll = function () {
    return this;
}

EmptyEmitter.prototype.count = 0;

EmptyEmitter.prototype.emit0 = function () { return this; }
EmptyEmitter.prototype.emit1 = function () { return this; }
EmptyEmitter.prototype.emit2 = function () { return this; }
EmptyEmitter.prototype.emit3 = function () { return this; }
EmptyEmitter.prototype.emit4 = function () { return this; }
EmptyEmitter.prototype.emit = function () { return this; }



function SingleEmitter(fn) {
    this[0] = fn;
}

SingleEmitter.prototype.init = function (fn, emptyEmitter, multipleEmitters) {
    this[0] = fn;
    this._emptyEmitter = emptyEmitter;
    this._multipleEmitters = multipleEmitters;
    return this;
}

SingleEmitter.prototype.hasListener = true;

SingleEmitter.prototype.push = function (fn) {
    const _fn = this[0]; this[0] = null;

    if (!this._multipleEmitters) {
        this._multipleEmitters = new MultipleEmitters();
    }

    return this._multipleEmitters.init(_fn, fn, this._emptyEmitter, this);
}

SingleEmitter.prototype.remove = function (fn) {
    if (this[0] !== fn) {
        return this;
    }

    return this.removeAll();
}

SingleEmitter.prototype.removeAll = function () {
    if (!this._emptyEmitter) {
        this._emptyEmitter = new EmptyEmitter();
    }

    this[0] = null;

    return this._emptyEmitter.init(this, this._multipleEmitters);
}

SingleEmitter.prototype.count = 1;

SingleEmitter.prototype.emit0 = function () { this[0](); return this; }
SingleEmitter.prototype.emit1 = function (a1) { this[0](a1); return this; }
SingleEmitter.prototype.emit2 = function (a1, a2) { this[0](a1, a2); return this; }
SingleEmitter.prototype.emit3 = function (a1, a2, a3) { this[0](a1, a2, a3); return this; }
SingleEmitter.prototype.emit4 = function (a1, a2, a3, a4) { this[0](a1, a2, a3, a4); return this; }
SingleEmitter.prototype.emit = function (args) { this[0].apply(undefined, args); return this; }



function MultipleEmitters() { }

MultipleEmitters.prototype.init = function (fn1, fn2, emptyEmitter, singleEmitter) {
    this[0] = fn1;
    this[1] = fn2;
    this._emptyEmitter = emptyEmitter;
    this._singleEmitter = singleEmitter;
    this.count = 2;

    return this;
}

MultipleEmitters.prototype.hasListener = true;

MultipleEmitters.prototype.push = function (fn) {
    this[this.count++] = fn;
    return this;
}

MultipleEmitters.prototype.remove = function (fn) {
    const count = this.count;

    let found = 0;

    for (let i = 0; count > i; ++i) {
        if (this[i] === fn) {
            ++found;
        } else if (found > 0) {
            this[i - found] = this[i];
        }
    }

    if (found === 0) {
        return this;
    }

    this.count -= found;

    while (found--) {
        this[count - 1 - found] = null;
    }

    switch (this.count) {
        case 0:
            return this._initEmptyEmitter();
        case 1:
            return this._singleEmitter.init(this[0], this._emptyEmitter, this);
        default:
            return this;
    }
}

MultipleEmitters.prototype.removeAll = function () {
    for (let i = 0; this.count > i; ++i) {
        this[i] = null;
    }

    this.count = 0;

    return this._initEmptyEmitter();
}

MultipleEmitters.prototype._initEmptyEmitter = function () {
    if (!this._emptyEmitter) {
        this._emptyEmitter = new EmptyEmitter();
    }

    return this._emptyEmitter.init(this._singleEmitter, this);
}

MultipleEmitters.prototype.emit0 = function () { for (let i = 0; this.count > i; ++i) this[i](); return this; }
MultipleEmitters.prototype.emit1 = function (a1) { for (let i = 0; this.count > i; ++i) this[i](a1); return this; }
MultipleEmitters.prototype.emit2 = function (a1, a2) { for (let i = 0; this.count > i; ++i) this[i](a1, a2); return this; }
MultipleEmitters.prototype.emit3 = function (a1, a2, a3) { for (let i = 0; this.count > i; ++i) this[i](a1, a2, a3); return this; }
MultipleEmitters.prototype.emit4 = function (a1, a2, a3, a4) { for (let i = 0; this.count > i; ++i) this[i](a1, a2, a3, a4); return this; }
MultipleEmitters.prototype.emit = function (args) { for (let i = 0; this.count > i; ++i) this[i].apply(undefined, args); return this; }
