import { Request, Response } from "express";
import { OrderService } from "./order.service";
import { AuthRequest } from "../../middleware/auth.middleware"; 

export class OrderController {

  static async create(req: AuthRequest, res: Response) {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const order = await OrderService.createOrder(userId, req.body.items);

  res.json(order);
}

  static async getAll(req: Request, res: Response) {
    const orders = await OrderService.getAllOrders();
    res.json(orders);
  }

  static async updateStatus(req: Request, res: Response) {
  const id = req.params.id as string;
  const { status } = req.body;

  const order = await OrderService.updateStatus(id, status);

  res.json(order);
}
  static async getAllAdmin(req: Request, res: Response) {
  const orders = await OrderService.getOrders();

  res.json(orders);
}
static async dashboard(req: Request, res: Response) {

  const stats = await OrderService.getDashboardStats();

  res.json(stats);

}
static async topProducts(req: Request, res: Response) {

  const products = await OrderService.topProducts();

  res.json(products);

}
static async salesChart(req: Request, res: Response) {

  const data = await OrderService.salesByDay();

  res.json(data);

}
}