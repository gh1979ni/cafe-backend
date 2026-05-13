"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const db_1 = require("../../config/db");
class OrderService {
    static async createOrder(userId, items) {
        let totalPrice = 0;
        for (const item of items) {
            const menuItem = await db_1.prisma.menuItem.findUnique({
                where: { id: item.menuItemId }
            });
            if (!menuItem) {
                throw new Error("Menu item not found");
            }
            totalPrice += menuItem.price * item.quantity;
        }
        const order = await db_1.prisma.order.create({
            data: {
                userId,
                totalPrice,
                items: {
                    create: items.map(item => ({
                        menuItemId: item.menuItemId,
                        quantity: item.quantity,
                        price: 0
                    }))
                }
            },
            include: { items: true }
        });
        return order;
    }
    static async getOrders() {
        return db_1.prisma.order.findMany({
            include: { items: true }
        });
    }
    static async getAllOrders() {
        return db_1.prisma.order.findMany({
            include: {
                user: true,
                items: {
                    include: {
                        menuItem: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });
    }
    static async updateStatus(orderId, status) {
        return db_1.prisma.order.update({
            where: { id: orderId },
            data: { status }
        });
    }
    static async getDashboardStats() {
        const totalOrders = await db_1.prisma.order.count();
        const pendingOrders = await db_1.prisma.order.count({
            where: {
                status: "pending"
            }
        });
        const deliveredOrders = await db_1.prisma.order.count({
            where: {
                status: "delivered"
            }
        });
        const revenue = await db_1.prisma.order.aggregate({
            _sum: {
                totalPrice: true
            }
        });
        return {
            totalOrders,
            pendingOrders,
            deliveredOrders,
            totalRevenue: revenue._sum.totalPrice || 0
        };
    }
    static async topProducts() {
        const items = await db_1.prisma.orderItem.groupBy({
            by: ["menuItemId"],
            _sum: {
                quantity: true
            },
            orderBy: {
                _sum: {
                    quantity: "desc"
                }
            },
            take: 5
        });
        return items;
    }
    static async salesByDay() {
        const orders = await db_1.prisma.order.findMany({
            select: {
                totalPrice: true,
                createdAt: true
            }
        });
        const grouped = {};
        orders.forEach(order => {
            const day = order.createdAt.toISOString().split("T")[0];
            if (!grouped[day]) {
                grouped[day] = 0;
            }
            grouped[day] += order.totalPrice;
        });
        return grouped;
    }
}
exports.OrderService = OrderService;
