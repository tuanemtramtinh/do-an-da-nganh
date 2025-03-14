"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateController = void 0;
const input_model_1 = __importDefault(require("../../models/input.model"));
const helper_1 = require("../../utils/helper");
class CalculateController {
    async saveInput(req, res) {
        const data = await input_model_1.default.create(req.body);
        (0, helper_1.successMessage)(res, 'Lưu dữ liệu thành công', data);
    }
}
exports.calculateController = new CalculateController();
