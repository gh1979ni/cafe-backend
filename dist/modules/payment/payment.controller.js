"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const payment_service_1 = require("./payment.service");
class PaymentController {
    static async createCheckout(req, res) {
        const userId = req.user?.id;
        const { items, totalPrice } = req.body;
        const session = await payment_service_1.PaymentService.createCheckoutSession(userId, items, totalPrice);
        res.json({ url: session.url });
    }
}
exports.PaymentController = PaymentController;
