"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EngineController = void 0;
const engine_model_1 = __importDefault(require("../../models/engine.model"));
const helper_1 = require("../../utils/helper");
class EngineController {
    async saveEngine(req, res) {
        const data = req.body;
        const newEngine = await engine_model_1.default.create(data);
        (0, helper_1.successMessage)(res, 'Lưu dữ liệu động cơ thành công', newEngine);
    }
}
exports.EngineController = EngineController;
const engineController = new EngineController();
exports.default = engineController;
