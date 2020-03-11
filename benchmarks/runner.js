const fs = require("fs");
const process = require("child_process");

class Runner {
    constructor() {
        this._suites = [];
    }

    addSuite(filename) {
        this._suites.push(filename);

        return this;
    }

    run() {
        const results = [];

        for (let filename of this._suites) {
            console.log(filename);
            const stdout = process.execSync(`node ./suites/${filename}`, { encoding: "utf-8" });

            console.log(stdout);

            results.push(renderResult(filename, stdout.trim()));
        }

        fs.writeFileSync("./README.md", results.join("\n"));
    }
}

function renderResult(title, result) {
    return `
${title}

\`\`\`
${result}
\`\`\`
`;
}

(function main() {
    const runner = new Runner();

    runner
        .addSuite("init.js")
        .addSuite("add_remove.js")
        .addSuite("add_remove_5_listeners.js")
        .addSuite("emit.js")
        .addSuite("emit_5_listeners.js")
        .addSuite("once.js")
        .addSuite("once_with_normal.js")

    runner.run();
}());
