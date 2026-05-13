import { Request, Response } from "express";
import Stripe from "stripe";
import { prisma } from "../../config/db";

let stripe: any = null;

console.log("Stripe webhook disabled");

export const handleWebhook = async (req: Request, res: Response) => {
  const event = req.body;

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const userId = session.metadata.userId;
    const items = JSON.parse(session.metadata.items);

    // 👉 اینجا order واقعی ساخته میشه
    await prisma.order.create({
      data: {
        userId,
        totalPrice: session.amount_total / 100,
        status: "paid",
        items: {
          create: items.map((item: any) => ({
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