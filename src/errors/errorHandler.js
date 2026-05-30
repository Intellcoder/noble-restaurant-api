"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = exports.customError = void 0;
class CustomError extends Error {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
const customError = (message, statusCode) => {
    return new CustomError(message, statusCode);
};
exports.customError = customError;
const ErrorHandler = (err, req, res, next) => {
    if (err instanceof CustomError) {
        return res
            .status(err.statusCode)
            .json({ success: false, message: err.message });
    }
};
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=errorHandler.js.map