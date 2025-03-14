"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const calculate_controller_1 = require("../../controllers/client/calculate.controller");
const request_middleware_1 = require("../../middlewares/request.middleware");
const router = express_1.default.Router();
router.post('/', request_middleware_1.inputRequestValidate, calculate_controller_1.calculateController.saveInput);
const calculateRouter = router;
exports.default = calculateRouter;
