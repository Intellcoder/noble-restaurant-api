"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = require("../errors/errorHandler");
const notFound = (req, res, next) => {
    next((0, errorHandler_1.customError)(`Route ${req.originalUrl} not found`, 404));
};
exports.default = notFound;
//# sourceMappingURL=notFound.js.map