import { Request, Response, NextFunction } from "express";
/**
 * POST /webhook/monnify
 *
 * Monnify fires this when a payment is completed, failed,
 * or reversed. We only act on PAID events.
 *
 * Monnify expects a 200 response quickly (< 10s).
 * Heavy work (WhatsApp messages etc.) is handled inside
 * OrderServices.verifyPayment which already has try/catch
 * around those side-effects so they won't block the 200.
 */
export declare const monnifyWebhook: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=webhook.controller.d.ts.map