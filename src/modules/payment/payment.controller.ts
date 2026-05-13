import { AuthRequest } from "../../middleware/auth.middleware";
import { Request, Response } from "express";
import { PaymentService } from "./payment.service";

export class PaymentController {

 static async createCheckout(req: AuthRequest, res: Response) {
  const userId = req.user?.id;
  const { items, totalPrice } = req.body;

  const session = await PaymentService.createCheckoutSession(
    userId!,
    items,
    totalPrice
  );

  res.json({ url: session.url });
}
}