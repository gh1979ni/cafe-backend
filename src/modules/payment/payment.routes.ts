import { Router } from "express";
import { PaymentController } from "./payment.controller";
import { handleWebhook } from "./payment.webhook";
const router = Router();

router.post("/checkout", PaymentController.createCheckout);
router.post("/webhook", handleWebhook);
export default router;