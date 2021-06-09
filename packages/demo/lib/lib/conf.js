"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conf_1 = __importDefault(require("conf"));
const CONFIG_NAME = 'gsdemo';
const conf = new conf_1.default({
    configName: CONFIG_NAME
});
exports.default = conf;
//# sourceMappingURL=conf.js.map