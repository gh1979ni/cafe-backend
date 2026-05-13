"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_1 = require("./payment.controller");
const payment_webhook_1 = require("./payment.webhook");
const router = (0, express_1.Router)();
router.post("/checkout", payment_controller_1.PaymentController.createCheckout);
router.post("/webhook", payment_webhook_1.handleWebhook);
exports.default = router;
