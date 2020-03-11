# events

Fast event emitter for javascript. Check the [benchmarks](https://github.com/YooShibu/events.git/benchmarks).

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
- [Fast](https://github.com/YooShibu/events.git/benchmarks)
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
You can find the library on ```window.EventEmitter```

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