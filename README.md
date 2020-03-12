# events

Fast event emitter for javascript. Check the [benchmarks](https://github.com/YooShibu/events/tree/master/benchmarks).

This is the benchmark result that emit event to the single listener
```
event-emitter x 6,300,170 ops/sec ±1.59% (94 runs sampled)
EventEmitter2 x 10,258,851 ops/sec ±0.54% (92 runs sampled)
EventEmitter3 x 12,151,111 ops/sec ±0.30% (91 runs sampled)
component-emitter x 2,663,473 ops/sec ±0.77% (94 runs sampled)
wolfy87-eventemitter x 2,081,167 ops/sec ±0.48% (95 runs sampled)
@foxify/events x 19,033,563 ops/sec ±0.72% (92 runs sampled)
@yoshibu/events x 20,305,984 ops/sec ±0.43% (93 runs sampled)
Fastest is @yoshibu/events
```

## Features
- [Fast](https://github.com/YooShibu/events/tree/master/benchmarks)
- Compiled by the [buble](https://buble.surge.sh/guide), and the compile target is 'ie8'
- Support ES2015 module, CommonJS, and the browser
- Support Wildcard event

## Install

### npm
```shell
npm i @yoshibu/events
```

### CDN
```html
<script src="https://unpkg.com/@yoshibu/events/dist/events.browser.js"></script>
```
You can find the library on `window.EventEmitter`

## Usage
```javascript
import EventEmitter from '@yoshibu/events'
// const EventEmitter = require('@yoshibu/events') // CommonJS

const emitter = new EventEmitter();

// listen to an event
emitter.on('foo', message => console.log(message));

// listen to all events
emitter.on('*', (event, message) => console.log(event, message));

emitter.emit('foo', 'hello');
// your console shows...
// hello
// foo hello
```

## API

### addListener(event, listener)

Alias for the [on](#on)

### on(event, listener)

- `event`: string
- `listener`: function
- Returns: EventEmitter

Register an event listener for the given event.

```javascript
import EventEmitter from '@yoshibu/events'

const ee = new EventEmitter();

ee.on('foo', message => console.log(message));
```

If you specified '*' for the event, the listener will be invoked with an event name and the arguments when any events emitted.

```javascript
import EventEmitter from '@yoshibu/events'

const ee = new EventEmitter();

ee.on('*', console.log);

ee.emit('foo', 1, 2, 3);
// --- console ---
// foo 1 2 3
```

### once(event, listener)

- `event`: string
- `listener`: function
- Returns: EventEmitter

Register an one-time event listener for the given event.

```javascript
import EventEmitter from '@yoshibu/events'

const ee = new EventEmitter();

ee.once('foo', message => console.log(message));
```

### emit(event[, ...args])

- `event`: string
- `args`: any
- Returns: boolean

Synchronously invoke each of the listeners registered for the given event, passing the supplied arguments to each.

Returns `true` if the event had listeners, `false` otherwise.

```javascript
import EventEmitter from '@yoshibu/events'

const ee = new EventEmitter();

ee.emit('foo', 1, 2, 3);
```

Event listener execution order

1. Listeners registered for the '*' event by the `once` method
1. Listeners registered for the'*' event by the `addListener` or `on` method
1. Listeners registered for the given event by the `once` method
1. Listeners registered for the given event by the `addListener` or `on` method

```javascript
import EventEmitter from '@yoshibu/events'

const ee = new EventEmitter();

ee
  .on('foo', () => console.log('on: foo'))
  .once('foo', () => console.log('once: foo'))
  .on('*', () => console.log('on: *'))
  .once('*', () => console.log('once: *'));

ee.emit('foo');
// --- console ---
// once: *
// on: *
// once: foo
// on: foo
```

### removeListener(event, listener)

- `event`: string
- `listener`: function
- Retusns: EventEmitter

Remove all specified listeners from the given event.

```javascript
import EventEmitter from '@yoshibu/events'

const ee = new EventEmitter();

const listener = () => {};

ee.on('foo', listener);

ee.removeListener('foo', listener);
```

### removeAllListeners([event])

- `event`: string
- Returns: EventEmitter

Remove all listeners from the given event. If `event` is not passed, remove all listeners.

```javascript
import EventEmitter from '@yoshibu/events'

const ee = new EventEmitter();

ee.removeAllListeners('foo');
```

### listenerCount(event)

- `event`: string
- Returns: number

Returns the listener count for the given event.

```javascript
import EventEmitter from '@yoshibu/events'

const ee = new EventEmitter();

ee.listenerCount('foo'); // 0
```

## Liccence
[MIT License](https://opensource.org/licenses/MIT) © YooShibu