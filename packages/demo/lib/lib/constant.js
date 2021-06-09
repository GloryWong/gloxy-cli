"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOG_DIR = exports.CACHE_DIR = exports.ROOT = void 0;
const path_1 = __importDefault(require("path"));
const configStore_1 = __importDefault(require("./configStore"));
const ROOT = configStore_1.default.get('root');
exports.ROOT = ROOT;
const CACHE_DIR = path_1.default.join(ROOT, '.cache');
exports.CACHE_DIR = CACHE_DIR;
const LOG_DIR = path_1.default.join(ROOT, '.log');
exports.LOG_DIR = LOG_DIR;
//# sourceMappingURL=constant.js.map