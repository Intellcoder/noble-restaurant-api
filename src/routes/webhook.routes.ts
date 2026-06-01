import { Router, Request, Response, NextFunction } from "express";

import { monnifyWebhook } from "../controllers/webhook.controller";
import { verifyMonnifySignature } from "../middlewares/verifymoniffySignature";

const router = Router();

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
const captureRawBody = (req: Request, res: Response, next: NextFunction) => {
  let data = Buffer.alloc(0);

  req.on("data", (chunk: Buffer) => {
    data = Buffer.concat([data, chunk]);
  });

  req.on("end", () => {
    (req as any).rawBody = data;

    // Manually parse JSON so req.body is still available downstream
    try {
      req.body = JSON.parse(data.toString("utf8"));
    } catch {
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
router.post(
  "/monnify",
  captureRawBody, // 1. Capture raw bytes + parse body manually
  verifyMonnifySignature, // 2. Verify HMAC-SHA512 signature
  monnifyWebhook, // 3. Process the event
);

export default router;
