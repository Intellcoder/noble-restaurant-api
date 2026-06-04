"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const webhook_controller_1 = require("../controllers/webhook.controller");
const verifymoniffySignature_1 = require("../middlewares/verifymoniffySignature");
const router = (0, express_1.Router)();
/**
 * Capture the raw body buffer BEFORE express.json() parses it.
 *
 * Monnify's HMAC-SHA512 signature is computed against the exact
 * raw bytes it sent. Once express.json() parses the body into an
 * object and we re-stringify it, byte-level differences (key order,
 * whitespace) cause the hash to mismatch. We must sign the original
 * bytes.
 *
 * This middleware runs only on this route — it won't affect the rest
 * of your app which uses express.json() normally.
 */
const captureRawBody = (req, res, next) => {
    let data = Buffer.alloc(0);
    req.on("data", (chunk) => {
        data = Buffer.concat([data, chunk]);
    });
    req.on("end", () => {
        req.rawBody = data;
        // Manually parse JSON so req.body is still available downstream
        try {
            req.body = JSON.parse(data.toString("utf8"));
        }
        catch {
            req.body = {};
        }
        next();
    });
    req.on("error", next);
};
/**
 * POST /webhook/monnify
 *
 * Register this URL in your Monnify dashboard:
 *   Dashboard → Settings → Developer → Webhook URLs
 *
 * Format: https://your-api-domain.com/webhook/monnify
 */
router.post("/monnify", captureRawBody, // 1. Capture raw bytes + parse body manually
verifymoniffySignature_1.verifyMonnifySignature, // 2. Verify HMAC-SHA512 signature
webhook_controller_1.monnifyWebhook);
exports.default = router;
//# sourceMappingURL=webhook.routes.js.map