import Stripe from "stripe";
console.log("Stripe Key:", process.env.STRIPE_SECRET_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export class PaymentService {

  static async createCheckoutSession(userId: string, items: any[], totalPrice: number) {
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