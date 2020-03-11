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

let emitter;

(new Suite())
    .add("event-emitter", function () {
        emitter = EE();
    })
    .add("EventEmitter2", function () {
        emitter = new EE2();
    })
    .add("EventEmitter3", function () {
        emitter = new EE3();
    })
    .add("component-emitter", function () {
        emitter = new CE;
    })
    .add("wolfy87-eventemitter", function () {
        emitter = new WE();
    })
    .add("@foxify/events", function () {
        emitter = new FE();
    })
    .add("@yoshibu/events", function () {
        emitter = new Master();
    })
    .on('cycle', function cycle(e) {
        console.log(e.target.toString());
    })
    .on('complete', function completed() {
        console.log(`Fastest is ${this.filter('fastest').map('name')}`);
    })
    .run({ async: true });
