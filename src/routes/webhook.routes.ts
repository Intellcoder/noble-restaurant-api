import { Router } from "express";
import { paystackwebhook } from "../controllers/webhook.controller";

const router = Router();

router.post("/paystack", paystackwebhook);

export default router;
