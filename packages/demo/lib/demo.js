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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectDemo = exports.listDemos = void 0;
const fs_1 = require("fs");
const constant_1 = require("./constant");
const log = __importStar(require("@glorywong/log"));
const enquirer_1 = require("enquirer");
function isNumberString(str) {
    return /^\d+$/.test(str);
}
function getList() {
    try {
        const files = fs_1.readdirSync(constant_1.DEMOS_DIR);
        return files.map((file, index) => {
            return {
                code: index,
                name: file
            };
        });
    }
    catch (error) {
        log.error('get demo list failed:', error);
        return [];
    }
}
function listDemos() {
    try {
        const list = getList();
        list.forEach(({ code, name }) => {
            log.info('[', 'success:', code, 'info:', ']', name);
        });
    }
    catch (error) {
        log.error('list demos failed:', error);
    }
}
exports.listDemos = listDemos;
function selectDemo() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const list = getList();
            const { demoFlag } = yield enquirer_1.prompt({
                type: 'input',
                name: 'demoFlag',
                message: 'Input demo code or name'
            });
            const demo = list.find(({ code, name }) => {
                if (isNumberString(demoFlag)) {
                    return code === Number(demoFlag);
                }
                else {
                    return name === demoFlag;
                }
            });
            if (!demo) {
                throw `Demo '${demo}' dose not exist`;
            }
            log.success(`You select demo ${demo.name}`);
        }
        catch (error) {
            log.error('select a demo failed:', error);
        }
    });
}
exports.selectDemo = selectDemo;
//# sourceMappingURL=demo.js.map