"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumeric = void 0;
const lodash_1 = __importDefault(require("lodash"));
function isNumeric(val) {
    return typeof val === 'number' ? lodash_1.default.isNumber(val) : /^\d+$/.test(val);
}
exports.isNumeric = isNumeric;
//# sourceMappingURL=utility.js.map