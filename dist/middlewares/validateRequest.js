"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => async (req, res, next) => {
    try {
        console.log("BODY:", req.body);
        req.body = await schema.parseAsync(req.body);
        next();
    }
    catch (error) {
        console.log("validation error:", error);
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: error?.issues ?? [],
        });
    }
};
exports.validate = validate;
//# sourceMappingURL=validateRequest.js.map