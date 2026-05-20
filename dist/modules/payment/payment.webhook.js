"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleWebhook = void 0;
const db_1 = require("../../config/db");
let stripe = null;
console.log("Stripe webhook disabled");
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
