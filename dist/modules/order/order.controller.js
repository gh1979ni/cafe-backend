"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const order_service_1 = require("./order.service");
class OrderController {
    static async create(req, res) {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const order = await order_service_1.OrderService.createOrder(userId, req.body.items);
        res.json(order);
    }
    static async getAll(req, res) {
        const orders = await order_service_1.OrderService.getAllOrders();
        res.json(orders);
    }
    static async updateStatus(req, res) {
        const id = req.params.id;
        const { status } = req.body;
        const order = await order_service_1.OrderService.updateStatus(id, status);
        res.json(order);
    }
    static async getAllAdmin(req, res) {
        const orders = await order_service_1.OrderService.getOrders();
        res.json(orders);
    }
    static async dashboard(req, res) {
        const stats = await order_service_1.OrderService.getDashboardStats();
        res.json(stats);
    }
    static async topProducts(req, res) {
        const products = await order_service_1.OrderService.topProducts();
        res.json(products);
    }
    static async salesChart(req, res) {
        const data = await order_service_1.OrderService.salesByDay();
        res.json(data);
    }
}
exports.OrderController = OrderController;
