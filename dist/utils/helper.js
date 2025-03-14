"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.failedMessage = exports.successMessage = void 0;
const successMessage = (res, message, data, statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data
    });
};
exports.successMessage = successMessage;
const failedMessage = (res, message, err, statusCode = 400) => {
    return res.status(statusCode).json({
        success: false,
        message,
        err
    });
};
exports.failedMessage = failedMessage;
