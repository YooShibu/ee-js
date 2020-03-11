
init.js

```
event-emitter x 51,365,695 ops/sec ±0.49% (94 runs sampled)
EventEmitter2 x 35,529,812 ops/sec ±0.60% (89 runs sampled)
EventEmitter3 x 55,978,923 ops/sec ±0.44% (90 runs sampled)
component-emitter x 90,061,848 ops/sec ±0.37% (93 runs sampled)
wolfy87-eventemitter x 90,039,434 ops/sec ±0.35% (96 runs sampled)
@foxify/events x 39,997,595 ops/sec ±0.99% (92 runs sampled)
@yoshibu/events x 90,128,863 ops/sec ±0.36% (93 runs sampled)
Fastest is @yoshibu/events,component-emitter,wolfy87-eventemitter
```


add_remove.js

```
event-emitter x 6,151,605 ops/sec ±2.14% (78 runs sampled)
EventEmitter2 x 7,906,033 ops/sec ±1.45% (93 runs sampled)
EventEmitter3 x 41,912,123 ops/sec ±0.70% (92 runs sampled)
component-emitter x 2,682,733 ops/sec ±1.67% (84 runs sampled)
wolfy87-eventemitter x 7,884,025 ops/sec ±0.99% (91 runs sampled)
@foxify/events x 36,851,390 ops/sec ±0.43% (94 runs sampled)
@yoshibu/events x 54,630,741 ops/sec ±0.77% (92 runs sampled)
Fastest is @yoshibu/events
```


add_remove_5_listeners.js

```
event-emitter x 1,118,127 ops/sec ±0.47% (94 runs sampled)
EventEmitter2 x 1,482,668 ops/sec ±0.55% (95 runs sampled)
EventEmitter3 x 3,026,575 ops/sec ±0.64% (94 runs sampled)
component-emitter x 782,367 ops/sec ±0.45% (93 runs sampled)
wolfy87-eventemitter x 966,048 ops/sec ±0.43% (95 runs sampled)
@foxify/events x 3,208,349 ops/sec ±0.44% (92 runs sampled)
@yoshibu/events x 5,385,648 ops/sec ±1.03% (87 runs sampled)
Fastest is @yoshibu/events
```


emit.js

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


emit_5_listeners.js

```
event-emitter x 1,661,827 ops/sec ±0.63% (95 runs sampled)
EventEmitter2 x 2,388,510 ops/sec ±0.65% (89 runs sampled)
EventEmitter3 x 3,416,046 ops/sec ±0.52% (93 runs sampled)
component-emitter x 1,362,032 ops/sec ±0.77% (87 runs sampled)
wolfy87-eventemitter x 920,017 ops/sec ±0.44% (95 runs sampled)
@foxify/events x 3,748,975 ops/sec ±0.39% (92 runs sampled)
@yoshibu/events x 3,866,033 ops/sec ±0.39% (93 runs sampled)
Fastest is [ '@yoshibu/events' ]
```


once.js

```
event-emitter x 3,811,748 ops/sec ±1.52% (83 runs sampled)
EventEmitter2 x 4,992,096 ops/sec ±0.61% (92 runs sampled)
EventEmitter3 x 22,614,693 ops/sec ±0.97% (90 runs sampled)
component-emitter x 1,030,170 ops/sec ±0.68% (92 runs sampled)
wolfy87-eventemitter x 3,119,654 ops/sec ±0.87% (86 runs sampled)
@foxify/events x 23,282,155 ops/sec ±1.42% (92 runs sampled)
@yoshibu/events x 32,651,208 ops/sec ±0.85% (91 runs sampled)
Fastest is @yoshibu/events
```


once_with_normal.js

```
event-emitter x 3,591,844 ops/sec ±0.87% (87 runs sampled)
EventEmitter2 x 4,314,039 ops/sec ±0.72% (92 runs sampled)
EventEmitter3 x 11,104,726 ops/sec ±1.28% (89 runs sampled)
component-emitter x 3,255,283 ops/sec ±0.35% (93 runs sampled)
wolfy87-eventemitter x 3,079,942 ops/sec ±0.42% (95 runs sampled)
@foxify/events x 8,433,871 ops/sec ±0.42% (96 runs sampled)
@yoshibu/events x 28,129,483 ops/sec ±5.38% (89 runs sampled)
Fastest is @yoshibu/events
```
