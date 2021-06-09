"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const lodash_1 = __importDefault(require("lodash"));
const log_1 = __importDefault(require("@glorywong/log"));
const init_1 = require("./init");
const archive_1 = require("./archive");
const program = new commander_1.Command();
program
    .version('1.0.0')
    .option('--init [path]', 'init GS Demo')
    .option('-l, --list', 'list all demos')
    .option('-c, --create <name>', 'create a demo')
    .option('--archive', 'archive GS Demo')
    .action(function (options) {
    const { init: gsDemoPath, list, create: demoName, archive } = options;
    if (gsDemoPath) {
        init_1.initGSDemo(typeof gsDemoPath === 'string' ? gsDemoPath : '');
        return;
    }
    if (!init_1.hasInited()) {
        log_1.default.warning('Please init GS Demo first.');
        return;
    }
    if (archive) {
        archive_1.archiveGSDemo();
        return;
    }
    if (lodash_1.default.isEmpty(options)) {
    }
    if (list) {
    }
    if (demoName) {
    }
})
    .parse();
//# sourceMappingURL=cli.js.map