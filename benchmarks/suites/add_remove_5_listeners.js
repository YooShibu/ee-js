"use strict";

const { Suite } = require("benchmark");

const
    EE = require("event-emitter"),
    EE2 = require("eventemitter2"),
    EE3 = require("eventemitter3"),
    CE = require("component-emitter"),
    WE = require("wolfy87-eventemitter"),
    FE = require("@foxify/events").EventEmitter,
    Master = require("../../dist/index");

function listener1() { }
function listener2() { }
function listener3() { }
function listener4() { }
function listener5() { }

const
    ee = EE(),
    ee2 = new EE2(),
    ee3 = new EE3(),
    ce = new CE,
    we = new WE(),
    fe = new FE(),
    master = new Master();

(new Suite())
    .add("event-emitter", function () {
        ee
            .on("foo", listener1)
            .on("foo", listener2)
            .on("foo", listener3)
            .on("foo", listener4)
            .on("foo", listener5)
            .off("foo", listener1)
            .off("foo", listener2)
            .off("foo", listener3)
            .off("foo", listener4)
            .off("foo", listener5);
    })
    .add("EventEmitter2", function () {
        ee2
            .on("foo", listener1)
            .on("foo", listener2)
            .on("foo", listener3)
            .on("foo", listener4)
            .on("foo", listener5)
            .off("foo", listener1)
            .off("foo", listener2)
            .off("foo", listener3)
            .off("foo", listener4)
            .off("foo", listener5);
    })
    .add("EventEmitter3", function () {
        ee3
            .on("foo", listener1)
            .on("foo", listener2)
            .on("foo", listener3)
            .on("foo", listener4)
            .on("foo", listener5)
            .off("foo", listener1)
            .off("foo", listener2)
            .off("foo", listener3)
            .off("foo", listener4)
            .off("foo", listener5);
    })
    .add("component-emitter", function () {
        ce
            .on("foo", listener1)
            .on("foo", listener2)
            .on("foo", listener3)
            .on("foo", listener4)
            .on("foo", listener5)
            .off("foo", listener1)
            .off("foo", listener2)
            .off("foo", listener3)
            .off("foo", listener4)
            .off("foo", listener5);
    })
    .add("wolfy87-eventemitter", function () {
        we
            .on("foo", listener1)
            .on("foo", listener2)
            .on("foo", listener3)
            .on("foo", listener4)
            .on("foo", listener5)
            .off("foo", listener1)
            .off("foo", listener2)
            .off("foo", listener3)
            .off("foo", listener4)
            .off("foo", listener5);
    })
    .add("@foxify/events", function () {
        fe
            .on("foo", listener1)
            .on("foo", listener2)
            .on("foo", listener3)
            .on("foo", listener4)
            .on("foo", listener5)
            .off("foo", listener1)
            .off("foo", listener2)
            .off("foo", listener3)
            .off("foo", listener4)
            .off("foo", listener5);
    })
    .add("@yoshibu/events", function () {
        master
            .on("foo", listener1)
            .on("foo", listener2)
            .on("foo", listener3)
            .on("foo", listener4)
            .on("foo", listener5)
            .off("foo", listener1)
            .off("foo", listener2)
            .off("foo", listener3)
            .off("foo", listener4)
            .off("foo", listener5);
    })
    .on('cycle', function cycle(e) {
        console.log(e.target.toString());
    })
    .on('complete', function completed() {
        console.log(`Fastest is ${this.filter('fastest').map('name')}`);
    })
    .run({ async: true });
