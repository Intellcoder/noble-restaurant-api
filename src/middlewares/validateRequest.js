"use strict";
// middlewares/validateRequest.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => async (req, res, next) => {
    try {
        console.log("BODY:", req.body);
        const validatedData = await schema.parseAsync(req.body);
        req.body = validatedData;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: error?.issues || [],
        });
    }
};
exports.validate = validate;
//# sourceMappingURL=validateRequest.js.map