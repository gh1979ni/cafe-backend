"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
let stripe = null;
console.log("Stripe is disabled for now");
console.log("Stripe Key:", process.env.STRIPE_SECRET_KEY);
class PaymentService {
    static async createCheckoutSession(userId, items, totalPrice) {
        return stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "gbp",
                        product_data: { name: "Cafe Order" },
                        unit_amount: Math.round(totalPrice * 100),
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                userId,
                items: JSON.stringify(items)
            },
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
        });
    }
}
exports.PaymentService = PaymentService;
