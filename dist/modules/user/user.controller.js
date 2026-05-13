"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = __importDefault(require("./user.service"));
class UserController {
    static async getAll(req, res) {
        const users = await user_service_1.default.getAllUsers();
        res.json(users);
    }
    static async updateRole(req, res) {
        const id = req.params.id;
        const { role } = req.body;
        const user = await user_service_1.default.updateRole(id, role);
        res.json(user);
    }
    static async deleteUser(req, res) {
        const id = req.params.id;
        await user_service_1.default.deleteUser(id);
        res.json({ message: "User deleted" });
    }
}
exports.UserController = UserController;
