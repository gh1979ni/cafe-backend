"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuController = void 0;
const menu_service_1 = require("./menu.service");
class MenuController {
    static async create(req, res) {
        const item = await menu_service_1.MenuService.createItem(req.body);
        res.json(item);
    }
    static async getAll(req, res) {
        const items = await menu_service_1.MenuService.getAllItems();
        res.json(items);
    }
    static async update(req, res) {
        const id = req.params.id;
        const item = await menu_service_1.MenuService.updateItem(id, req.body);
        res.json(item);
    }
    static async delete(req, res) {
        const id = req.params.id;
        await menu_service_1.MenuService.deleteItem(id);
        res.json({ message: "Deleted" });
    }
}
exports.MenuController = MenuController;
