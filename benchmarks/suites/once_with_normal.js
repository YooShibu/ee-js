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

function listener() { }

const
    ee = EE(),
    ee2 = new EE2(),
    ee3 = new EE3(),
    ce = new CE,
    we = new WE(),
    fe = new FE(),
    master = new Master();

ee.on("foo", listener);
ee2.on("foo", listener);
ee3.on("foo", listener);
ce.on("foo", listener);
we.on("foo", listener);
fe.on("foo", listener);
master.on("foo", listener);

(new Suite())
    .add("event-emitter", function () {
        ee.once("foo", listener).emit("foo");
    })
    .add("EventEmitter2", function () {
        ee2.once("foo", listener).emit("foo");
    })
    .add("EventEmitter3", function () {
        ee3.once("foo", listener).emit("foo");
    })
    .add("component-emitter", function () {
        ce.once("foo", listener).emit("foo");
    })
    .add("wolfy87-eventemitter", function () {
        we.once("foo", listener).emit("foo");
    })
    .add("@foxify/events", function () {
        fe.once("foo", listener).emit("foo");
    })
    .add("@yoshibu/events", function () {
        master.once("foo", listener).emit("foo");
    })
    .on('cycle', function cycle(e) {
        console.log(e.target.toString());
    })
    .on('complete', function completed() {
        console.log(`Fastest is ${this.filter('fastest').map('name')}`);
    })
    .run({ async: true });