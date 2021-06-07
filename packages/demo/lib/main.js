"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const demos_1 = require("./demos");
const program = new commander_1.Command();
program
    .version('1.0.0')
    .action(function () {
    demos_1.listDemos();
    demos_1.selectDemo();
})
    .parse();
//# sourceMappingURL=main.js.map