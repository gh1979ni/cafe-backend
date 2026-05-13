"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleWebhook = void 0;
const stripe_1 = __importDefault(require("stripe"));
const db_1 = require("../../config/db");
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
const handleWebhook = async (req, res) => {
    const event = req.body;
    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const userId = session.metadata.userId;
        const items = JSON.parse(session.metadata.items);
        // 👉 اینجا order واقعی ساخته میشه
        await db_1.prisma.order.create({
            data: {
                userId,
                totalPrice: session.amount_total / 100,
                status: "paid",
                items: {
                    create: items.map((item) => ({
                        menuItemId: item.menuItemId,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            }
        });
    }
    res.json({ received: true });
};
exports.handleWebhook = handleWebhook;
