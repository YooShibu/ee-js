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

function listener() {
    if (arguments.length > 10) {
        throw new Error("Too many arguments");
    }
}

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
            .on("foo", listener)
            .off("foo", listener);
    })
    .add("EventEmitter2", function () {
        ee2
            .on("foo", listener)
            .removeListener("foo", listener);
    })
    .add("EventEmitter3", function () {
        ee3
            .on("foo", listener)
            .removeListener("foo", listener);
    })
    .add("component-emitter", function () {
        ce
            .on("foo", listener)
            .removeListener("foo", listener);
    })
    .add("wolfy87-eventemitter", function () {
        we
            .on("foo", listener)
            .removeListener("foo", listener);
    })
    .add("@foxify/events", function () {
        fe
            .on("foo", listener)
            .removeListener("foo", listener);
    })
    .add("@yoshibu/events", function () {
        master
            .on("foo", listener)
            .removeListener("foo", listener);
    })
    .on('cycle', function cycle(e) {
        console.log(e.target.toString());
    })
    .on('complete', function completed() {
        console.log(`Fastest is ${this.filter('fastest').map('name')}`);
    })
    .run({ async: true });