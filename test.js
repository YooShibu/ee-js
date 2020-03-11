const
    EventEmitter = require("./dist/index"),
    assert = require("assert");


(function testEventEmitter() {
    (function testAddEvent() {
        const ee = new EventEmitter();

        assert.strictEqual(ee.listenerCount("foo"), 0);

        assert.strictEqual(ee.addListener("foo", () => { }), ee);
        assert.strictEqual(ee.listenerCount("foo"), 1);
        assert.throws(() => ee.addListener("foo", "hello"));

        assert.strictEqual(ee.on("foo", () => { }), ee);
        assert.strictEqual(ee.listenerCount("foo"), 2);
        assert.throws(() => ee.on("foo", "hello"));

        assert.strictEqual(ee.once("bar", () => { }), ee);
        assert.strictEqual(ee.listenerCount("bar"), 1);
        assert.throws(() => ee.once("foo", "hwllo"));

        assert.strictEqual(ee.on("*", () => { }), ee);
        assert.strictEqual(ee.listenerCount("foo"), 3);
        assert.strictEqual(ee.listenerCount("bar"), 2);
        assert.throws(() => ee.onAny("hello"));
    }());

    (function testListenerCount() {
        const ee = new EventEmitter();

        // _event is undefined
        assert.strictEqual(ee.listenerCount(), 0);

        // _event exists
        ee.on("foo", () => { });
        assert.strictEqual(ee.listenerCount("foo"), 1);
        assert.strictEqual(ee.listenerCount("bar"), 0);

        // with wildcard event
        ee.on("*", () => { });
        assert.strictEqual(ee.listenerCount("foo"), 2);
        assert.strictEqual(ee.listenerCount("bar"), 1);
    }());

    (function testRemoveListener() {
        const
            ee = new EventEmitter(),
            fn1 = () => { },
            fn2 = () => { },
            fn3 = () => { };

        // not throw if _event is nothing
        assert.strictEqual(ee.removeListener("foo", fn1), ee);

        // SingleEmitter -------
        ee.on("foo", fn1);

        ee.off("foo", fn2); // not found
        assert.strictEqual(ee.listenerCount("foo"), 1);

        ee.off("foo", fn1);
        assert.strictEqual(ee.listenerCount("foo"), 0);

        // EmptyEmitter ------
        assert.strictEqual(ee.off("foo", fn1), ee);

        // MultipleEmitter ------
        ee.on("foo", fn1);
        ee.on("foo", fn2);
        ee.on("foo", fn3);

        ee.off("foo", () => { }); // not found
        assert.strictEqual(ee.listenerCount("foo"), 3);

        ee.off("foo", fn1); // return MultipleEmitter self
        assert.strictEqual(ee.listenerCount("foo"), 2);

        ee.off("foo", fn2); // return SingleEmitter
        assert.strictEqual(ee.listenerCount("foo"), 1);

        ee.on("foo", fn3);
        ee.off("foo", fn3) // return EmptyEmitter
        assert.strictEqual(ee.listenerCount("foo"), 0);
    }());

    (function testRemoveAllListeners() {
        const ee = new EventEmitter();

        assert.strictEqual(ee.removeAllListeners(), ee);
        assert.strictEqual(ee.removeAllListeners("foo"), ee);

        ee
            .on("foo", () => { })
            .on("foo", () => { })
            .on("bar", () => { })
            .once("foo", () => { })
            .removeAllListeners("foo");

        assert.strictEqual(ee.listenerCount("foo"), 0);
        assert.strictEqual(ee.listenerCount("bar"), 1);

        ee
            .on("baz", () => { })
            .on("foo", () => { })
            .once("foo", () => { })
            .on("*", () => { })
            .removeAllListeners();

        assert.strictEqual(ee.listenerCount("foo"), 0);
        assert.strictEqual(ee.listenerCount("bar"), 0);
        assert.strictEqual(ee.listenerCount("baz"), 0);

        // remove the event if it exists
        ee.removeAllListeners("booo");
    }());

    (function testAddEventAndRemove() {
        const
            ee = new EventEmitter(),
            fn1 = () => { },
            fn2 = () => { };

        // SingleEmitter to EmptyEmitter
        ee.on("foo", fn1);
        ee.off("foo", fn1);
        assert.strictEqual(ee.listenerCount("foo"), 0);

        // EmptyEmitter to SingleEmitter
        ee.on("foo", fn1);
        assert.strictEqual(ee.listenerCount("foo"), 1);

        // SingleEmitter to MultipleEmitter
        ee.on("foo", fn2);
        assert.strictEqual(ee.listenerCount("foo"), 2);

        // MultipleEmitter to SingleEmitter
        ee.off("foo", fn2);
        assert.strictEqual(ee.listenerCount("foo"), 1);

        // MultipleEmitter to EmptyEmitter
        ee.on("foo", fn1);
        ee.off("foo", fn1);
        assert.strictEqual(ee.listenerCount("foo"), 0);
    }());

    (function testEmitEmptyListener() {
        const ee = new EventEmitter();

        assert.strictEqual(ee.emit("foo"), false);
    }());

    (function testEmitSingleListener() {
        const
            ee = new EventEmitter(),
            called = [];

        ee.on("foo", (a1, a2, a3, a4, a5) => {
            called.push([a1, a2, a3, a4, a5]);
        });

        assert.ok(ee.emit("foo"));
        assert.ok(ee.emit("foo", 1));
        assert.ok(ee.emit("foo", 1, 2));
        assert.ok(ee.emit("foo", 1, 2, 3));
        assert.ok(ee.emit("foo", 1, 2, 3, 4));
        assert.ok(ee.emit("foo", 1, 2, 3, 4, 5));

        assert.deepStrictEqual(called, [
            [undefined, undefined, undefined, undefined, undefined],
            [1, undefined, undefined, undefined, undefined],
            [1, 2, undefined, undefined, undefined],
            [1, 2, 3, undefined, undefined],
            [1, 2, 3, 4, undefined],
            [1, 2, 3, 4, 5]
        ]);
    }());

    (function testEmitMultipleListener() {
        const
            ee = new EventEmitter(),
            called = [];

        ee
            .on("foo", (a1, a2, a3, a4, a5) => {
                called.push([a1, a2, a3, a4, a5]);
            })
            .on("foo", (a1, a2, a3, a4, a5) => {
                called.push([a1, a2, a3, a4, a5]);
            });

        assert.ok(ee.emit("foo"));
        assert.ok(ee.emit("foo", 1));
        assert.ok(ee.emit("foo", 1, 2));
        assert.ok(ee.emit("foo", 1, 2, 3));
        assert.ok(ee.emit("foo", 1, 2, 3, 4));
        assert.ok(ee.emit("foo", 1, 2, 3, 4, 5));

        assert.deepStrictEqual(called, [
            [undefined, undefined, undefined, undefined, undefined],
            [undefined, undefined, undefined, undefined, undefined],
            [1, undefined, undefined, undefined, undefined],
            [1, undefined, undefined, undefined, undefined],
            [1, 2, undefined, undefined, undefined],
            [1, 2, undefined, undefined, undefined],
            [1, 2, 3, undefined, undefined],
            [1, 2, 3, undefined, undefined],
            [1, 2, 3, 4, undefined],
            [1, 2, 3, 4, undefined],
            [1, 2, 3, 4, 5],
            [1, 2, 3, 4, 5]
        ]);
    }());

    (function testEmitOnce() {
        const
            ee = new EventEmitter(),
            called = [],
            cb = (a1, a2, a3, a4, a5) => {
                called.push([a1, a2, a3, a4, a5]);
            };

        assert.ok(ee.once("foo", cb).emit("foo"));
        assert.ok(ee.once("foo", cb).emit("foo", 1));
        assert.ok(ee.once("foo", cb).emit("foo", 1, 2));
        assert.ok(ee.once("foo", cb).emit("foo", 1, 2, 3));
        assert.ok(ee.once("foo", cb).emit("foo", 1, 2, 3, 4));
        assert.ok(ee.once("foo", cb).emit("foo", 1, 2, 3, 4, 5));

        assert.deepStrictEqual(called, [
            [undefined, undefined, undefined, undefined, undefined],
            [1, undefined, undefined, undefined, undefined],
            [1, 2, undefined, undefined, undefined],
            [1, 2, 3, undefined, undefined],
            [1, 2, 3, 4, undefined],
            [1, 2, 3, 4, 5]
        ]);
    }());

    (function testEmitOnceWithNormal() {
        const
            ee = new EventEmitter(),
            called = [],
            listener = num => called.push(num);

        ee.on("foo", listener);
        ee.once("foo", listener);

        ee.emit("foo", 100);
        ee.emit("foo", 100);

        assert.deepStrictEqual(called, [100, 100, 100]);
    }());

    (function testEmitWildCard() {
        const
            ee = new EventEmitter(),
            called = [];

        ee.on("*", (eventName, a1, a2, a3, a4, a5) => {
            called.push([eventName, a1, a2, a3, a4, a5]);
        });

        assert.ok(ee.emit("foo"));
        assert.ok(ee.emit("baz", 1));
        assert.ok(ee.emit("bar", 1, 2));
        assert.ok(ee.emit("foo", 1, 2, 3));
        assert.ok(ee.emit("baz", 1, 2, 3, 4));
        assert.ok(ee.emit("bar", 1, 2, 3, 4, 5));

        assert.deepStrictEqual(called, [
            ["foo", undefined, undefined, undefined, undefined, undefined],
            ["baz", 1, undefined, undefined, undefined, undefined],
            ["bar", 1, 2, undefined, undefined, undefined],
            ["foo", 1, 2, 3, undefined, undefined],
            ["baz", 1, 2, 3, 4, undefined],
            ["bar", 1, 2, 3, 4, 5]
        ]);
    }());

    (function testEmitOnceWildCard() {
        const
            ee = new EventEmitter(),
            called = [],
            listener = (eventName, a1, a2, a3, a4, a5) => {
                called.push([eventName, a1, a2, a3, a4, a5]);
            };

        assert.ok(ee.once("*", listener).emit("foo"));
        assert.ok(ee.once("*", listener).emit("baz", 1));
        assert.ok(ee.once("*", listener).emit("bar", 1, 2));
        assert.ok(ee.once("*", listener).emit("foo", 1, 2, 3));
        assert.ok(ee.once("*", listener).emit("baz", 1, 2, 3, 4));
        assert.ok(ee.once("*", listener).emit("bar", 1, 2, 3, 4, 5));

        assert.deepStrictEqual(called, [
            ["foo", undefined, undefined, undefined, undefined, undefined],
            ["baz", 1, undefined, undefined, undefined, undefined],
            ["bar", 1, 2, undefined, undefined, undefined],
            ["foo", 1, 2, 3, undefined, undefined],
            ["baz", 1, 2, 3, 4, undefined],
            ["bar", 1, 2, 3, 4, 5]
        ]);
    }());

    (function testIgnoreEmitWildCardDirectory() {
        const ee = new EventEmitter();

        ee.on("*", () => { });

        assert.strictEqual(ee.emit("*"), false);
    }());

    (function testEmitMultipleWildCard() {
        const
            ee = new EventEmitter(),
            called = [];

        ee.on("*", (eventName, a1, a2, a3, a4) => {
            called.push([eventName, a1, a2, a3, a4]);
        });
        ee.on("*", (eventName, a1, a2, a3, a4) => {
            called.push([eventName, a1, a2, a3, a4]);
        });

        assert.ok(ee.emit("foo", 1, 2, 3));
        assert.ok(ee.emit("foo", 1, 2, 3, 4));

        assert.deepStrictEqual(called, [
            ["foo", 1, 2, 3, undefined],
            ["foo", 1, 2, 3, undefined],
            ["foo", 1, 2, 3, 4],
            ["foo", 1, 2, 3, 4]
        ]);
    }());

    (function testGuardEmitFromNullEmitterStore() {
        const ee = new EventEmitter();

        ee
            .on("foo", () => { })
            .once("foo", () => { });

        assert.strictEqual(ee.emit("bar"), false);
    }());

    (function testGuardRemovelistenerFromNullEmitterStore() {
        const ee = new EventEmitter();

        ee.on("foo", () => { })

        assert.strictEqual(ee.removeListener("bar", () => { }), ee);
    }());

    (function testEmptyEmitter() {
        const
            ee = new EventEmitter(),
            listener = () => { };

        ee.on("foo", listener);
        ee.on("*", listener)

        ee.removeAllListeners("foo");
        ee.removeAllListeners("*");

        // call removeAll method of EmptyEmitter
        ee.removeAllListeners("foo");

        ee.once("foo", listener);
        assert.ok(ee.emit("foo"));

        ee.once("foo", listener);
        assert.ok(ee.emit("foo", 1));

        ee.once("foo", listener);
        assert.ok(ee.emit("foo", 1, 2));

        ee.once("foo", listener);
        ee.once("*", listener); // Emit emit4 method of EmptyEmitter
        assert.ok(ee.emit("foo", 1, 2, 3));

        ee.once("foo", listener);
        assert.ok(ee.emit("foo", 1, 2, 3, 4));

        ee.once("foo", listener);
        assert.ok(ee.emit("foo", 1, 2, 3, 4, 5));
    }());

}());
