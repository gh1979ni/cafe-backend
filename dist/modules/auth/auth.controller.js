"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    static async register(req, res) {
        try {
            const { email, password } = req.body;
            const existingUser = await prisma_1.default.user.findUnique({
                where: { email }
            });
            if (existingUser) {
                return res.status(400).json({
                    message: "User already exists"
                });
            }
            const hashedPassword = await bcryptjs_1.default.hash(password, 10);
            const user = await prisma_1.default.user.create({
                data: {
                    name: "Admin",
                    customerCode: `CUS-${Date.now()}`,
                    email,
                    password: hashedPassword,
                    role: "admin"
                }
            });
            res.json(user);
        }
        catch (error) {
            res.status(500).json({
                message: "Register failed"
            });
        }
    }
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await prisma_1.default.user.findUnique({
                where: { email }
            });
            if (!user) {
                return res.status(400).json({
                    message: "Invalid credentials"
                });
            }
            const validPassword = await bcryptjs_1.default.compare(password, user.password);
            if (!validPassword) {
                return res.status(400).json({
                    message: "Invalid credentials"
                });
            }
            const token = jsonwebtoken_1.default.sign({
                id: user.id,
                role: user.role
            }, process.env.JWT_SECRET, {
                expiresIn: "7d"
            });
            res.json({
                token,
                user
            });
        }
        catch (error) {
            res.status(500).json({
                message: "Login failed"
            });
        }
    }
}
exports.AuthController = AuthController;
