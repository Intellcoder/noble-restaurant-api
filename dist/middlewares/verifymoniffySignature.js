"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyMonnifySignature = void 0;
const crypto_1 = __importDefault(require("crypto"));
/**
 * Monnify signs every webhook payload with HMAC-SHA512
 * using your secret key. We verify the signature before
 * touching the database.
 *
 * Header sent by Monnify: "monnify-signature"
 */
const verifyMonnifySignature = (req, res, next) => {
    const signature = req.headers["monnify-signature"];
    if (!signature) {
        return res.status(401).json({
            success: false,
            message: "Missing Monnify signature",
        });
    }
    /**
     * IMPORTANT: Monnify signs the raw request body string.
     * express.json() parses it into an object, so you must
     * use express.raw() on the webhook route BEFORE express.json()
     * — OR store req.rawBody in a custom middleware (see route file).
     *
     * We compute HMAC-SHA512 of the raw body using your secret key.
     */
    const rawBody = req.rawBody;
    if (!rawBody) {
        return res.status(400).json({
            success: false,
            message: "Raw body unavailable — check middleware order",
        });
    }
    const computedHash = crypto_1.default
        .createHmac("sha512", process.env.MONNIFY_SECRET_KEY)
        .update(rawBody)
        .digest("hex");
    if (computedHash !== signature) {
        return res.status(401).json({
            success: false,
            message: "Invalid webhook signature",
        });
    }
    next();
};
exports.verifyMonnifySignature = verifyMonnifySignature;
//# sourceMappingURL=verifymoniffySignature.js.map