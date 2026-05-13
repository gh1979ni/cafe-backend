"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const stripe_1 = __importDefault(require("stripe"));
console.log("Stripe Key:", process.env.STRIPE_SECRET_KEY);
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
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
