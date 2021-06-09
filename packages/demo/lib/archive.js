"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.archiveGSDemo = void 0;
const conf_1 = __importDefault(require("./lib/conf"));
const recursive_copy_1 = __importDefault(require("recursive-copy"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const luxon_1 = require("luxon");
const log_1 = __importDefault(require("@glorywong/log"));
function archiveGSDemo() {
    try {
        const root = String(conf_1.default.get('root'));
        const { name } = path_1.default.parse(root);
        const archivedPath = path_1.default.join(process.env.HOME || '', '.gsdemo-archive', `${name}.${luxon_1.DateTime.now()}`);
        recursive_copy_1.default(root, archivedPath);
        fs_1.default.rmdirSync(root, {
            recursive: true
        });
        conf_1.default.delete('root');
        log_1.default.success(`Successfully archive GS Demo '${name}' to '${archivedPath}'`);
        return true;
    }
    catch (error) {
        log_1.default.error('Faied to archive:', error);
        return false;
    }
}
exports.archiveGSDemo = archiveGSDemo;
//# sourceMappingURL=archive.js.map