"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
// src/utils/errors/CustomError.ts
class CustomError extends Error {
    statusCode;
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=customError.js.map