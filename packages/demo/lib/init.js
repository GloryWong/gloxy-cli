"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasInited = exports.initGSDemo = void 0;
const recursive_copy_1 = __importDefault(require("recursive-copy"));
const log_1 = __importDefault(require("@glorywong/log"));
const conf_1 = __importDefault(require("./lib/conf"));
const path_1 = __importDefault(require("path"));
function hasInited() {
    return conf_1.default.has('root');
}
exports.hasInited = hasInited;
function initGSDemo(gsDemoPath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (hasInited()) {
                log_1.default.info('GS Demo has existed.');
                return false;
            }
            if (!gsDemoPath) {
                gsDemoPath = 'gsdemo';
            }
            const root = path_1.default.resolve(gsDemoPath);
            yield recursive_copy_1.default('lib/template', root, {
                dot: true,
                debug: true
            });
            conf_1.default.set('root', root);
            conf_1.default.set('description', 'My GS Demo');
            log_1.default.success(`GS Demo was created successfully located in ${root}.`);
            return true;
        }
        catch (error) {
            log_1.default.error('Failed to init GS Demo:', error);
            return false;
        }
    });
}
exports.initGSDemo = initGSDemo;
//# sourceMappingURL=init.js.map