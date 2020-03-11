import buble from "@rollup/plugin-buble";
import { terser } from "rollup-plugin-terser";
import { readFileSync } from "fs";

const pkg = JSON.parse(readFileSync("package.json"));

export default {
    input: "index.mjs",
    plugins: [buble({ target: { ie: 8 } })],
    output: [
        {
            file: pkg.main,
            format: "cjs",
            sourcemap: true
        },
        {
            file: pkg["main:browser"],
            format: "iife",
            name: "EventEmitter",
            plugins: [terser({ mangle: true, compress: true })]
        }
    ]
}