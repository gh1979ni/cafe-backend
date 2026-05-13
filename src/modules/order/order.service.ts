import { prisma } from "../../config/db";
import { OrderStatus } from "@prisma/client";
export class OrderService {
  static async createOrder(userId: string, items: any[]) {
    let totalPrice = 0;
    for (const item of items) {
  const menuItem = await prisma.menuItem.findUnique({
    where: { id: item.menuItemId }
  });
  if (!menuItem) {
    throw new Error("Menu item not found");
  }

  totalPrice += menuItem.price * item.quantity;
}

    const order = await prisma.order.create({
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
    return prisma.order.findMany({
      include: { items: true }
    });
  }
  static async getAllOrders() {

  return prisma.order.findMany({
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
  static async updateStatus(orderId: string, status: any) {
    return prisma.order.update({
      where: { id: orderId },
      data: { status }
    });
  }
  static async getDashboardStats() {

  const totalOrders = await prisma.order.count();

  const pendingOrders = await prisma.order.count({
    where: {
      status: "pending"
    }
  });

  const deliveredOrders = await prisma.order.count({
    where: {
      status: "delivered"
    }
  });

  const revenue = await prisma.order.aggregate({
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

  const items = await prisma.orderItem.groupBy({
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

  const orders = await prisma.order.findMany({
    select: {
      totalPrice: true,
      createdAt: true
    }
  });

  const grouped: any = {};

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