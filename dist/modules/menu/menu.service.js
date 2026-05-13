"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuService = void 0;
const db_1 = require("../../config/db");
class MenuService {
    static async createItem(data) {
        return db_1.prisma.menuItem.create({
            data
        });
    }
    static async getAllItems() {
        return db_1.prisma.menuItem.findMany();
    }
    static async updateItem(id, data) {
        return db_1.prisma.menuItem.update({
            where: { id },
            data
        });
    }
    static async deleteItem(id) {
        return db_1.prisma.menuItem.delete({
            where: { id }
        });
    }
}
exports.MenuService = MenuService;
