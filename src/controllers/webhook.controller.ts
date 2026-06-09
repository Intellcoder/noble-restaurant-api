import { Request, Response, NextFunction } from "express";
import { PaymentService } from "../utils/Payment";
import { success } from "zod";
import { customError } from "../errors/errorHandler";

/**
 * Monnify webhook event types we care about.
 * Full list: https://developers.monnify.com/docs/webhooks/event-types
 */
const SUCCESSFUL_PAYMENT_STATUS = "PAID";

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
export const monnifyWebhook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  /**
   * Always acknowledge Monnify immediately.
   * If we don't respond with 200 fast enough,
   * Monnify will retry the webhook multiple times.
   *
   * We send 200 first, then process.
   */
  res.status(200).json({ success: true });

  try {
    const event = req.body;
    console.log("running monify");
    /**
     * Monnify webhook payload shape:
     * {
     *   eventType: "SUCCESSFUL_TRANSACTION",
     *   eventData: {
     *     transactionReference: "MNFY|...",
     *     paymentReference: "your-order-id",   ← the reference YOU sent
     *     amountPaid: 6000,
     *     totalPayable: 6000,
     *     paymentStatus: "PAID",
     *     paymentMethod: "CARD" | "ACCOUNT_TRANSFER" | "USSD",
     *     product: { reference: "your-order-id", type: "WEB_SDK" },
     *     ...
     *   }
     * }
     */
    const { eventData } = event;

    if (!eventData) {
      console.error("[Monnify Webhook] Missing eventData in payload:", event);
      return;
    }

    const {
      paymentStatus,
      paymentReference, // the reference you passed to MonnifySDK.initialize()
      transactionReference,
      amountPaid,
    } = eventData;

    console.info(
      `[Monnify Webhook] Event received — status: ${paymentStatus}, ref: ${paymentReference}`,
    );

    /**
     * Only process confirmed paid events.
     * Monnify may also send FAILED, EXPIRED, REVERSED — ignore those
     * here; your existing manual verifyPayment handles edge cases.
     */
    if (paymentStatus !== SUCCESSFUL_PAYMENT_STATUS) {
      console.info(
        `[Monnify Webhook] Skipping non-PAID event: ${paymentStatus}`,
      );
      return;
    }

    if (!paymentReference) {
      console.error(
        "[Monnify Webhook] No paymentReference in eventData",
        eventData,
      );
      return;
    }

    /**
     * Re-use your existing verifyPayment service.
     * It handles:
     *   - Finding the order by paymentReference
     *   - Setting paymentStatus → PAID, orderStatus → CONFIRMED
     *   - Sending WhatsApp to customer + admin
     */
    await PaymentService.verifyPayment(paymentReference);

    console.info(
      `[Monnify Webhook] Order verified successfully — ref: ${paymentReference}`,
    );
  } catch (error: any) {
    /**
     * We already sent 200 to Monnify so don't call next(error).
     * Just log — a retry from Monnify will re-trigger this if needed.
     */
    console.error(
      "[Monnify Webhook] Processing error:",
      error?.message ?? error,
    );
  }
};

export const paystackwebhook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log("running webhook");
    const signature = req.headers["x-paystack-signature"] as string;

    const rawBody = JSON.stringify(req.body);
    const isValid = PaymentService.verifySignature(rawBody, signature);

    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid signature",
      });
    }

    const result = await PaymentService.handlePaystackEvent(req.body);
    console.log("result:", result);

    return res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    return next(customError("Payment verification failed", 500));
  }
};
