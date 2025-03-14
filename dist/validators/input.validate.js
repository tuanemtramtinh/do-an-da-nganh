"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.inputSchema = joi_1.default.object({
    F: joi_1.default.number().required(),
    v: joi_1.default.number().required(),
    z: joi_1.default.number().required(),
    p: joi_1.default.number().required(),
    L: joi_1.default.number().required(),
    t1: joi_1.default.number().required(),
    t2: joi_1.default.number().required(),
    T1: joi_1.default.number().required(),
    T2: joi_1.default.number().required()
});
