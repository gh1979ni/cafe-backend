import { prisma } from "../../config/db";

export class MenuService {

  static async createItem(data: any) {
    return prisma.menuItem.create({
      data
    });
  }

  static async getAllItems() {
    return prisma.menuItem.findMany();
  }

  static async updateItem(id: string, data: any) {
    return prisma.menuItem.update({
      where: { id },
      data
    });
  }

  static async deleteItem(id: string) {
    return prisma.menuItem.delete({
      where: { id }
    });
  }
}