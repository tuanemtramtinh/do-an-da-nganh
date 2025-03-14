"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputRequestValidate = void 0;
const input_validate_1 = require("../validators/input.validate");
const inputRequestValidate = (req, res, next) => {
    const validate = input_validate_1.inputSchema.validate(req.body);
    if (validate.error) {
        res.status(400).json(validate.error.details);
        return;
    }
    next();
};
exports.inputRequestValidate = inputRequestValidate;
