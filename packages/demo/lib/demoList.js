"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDemoList = void 0;
const fs_1 = require("fs");
const log = __importStar(require("@glorywong/log"));
const conf_1 = __importDefault(require("./lib/conf"));
function getDemoList() {
    try {
        const dirs = fs_1.readdirSync(String(conf_1.default.get('root')));
        return dirs.map((dirname, index) => ({
            id: '123',
            code: index,
            name: dirname,
            tags: [],
            path: ''
        }));
    }
    catch (error) {
        log.error('get demo list failed:', error);
        return [];
    }
}
exports.getDemoList = getDemoList;
//# sourceMappingURL=demoList.js.map