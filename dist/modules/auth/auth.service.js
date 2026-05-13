"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const db_1 = require("../../config/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    static async register(data) {
        const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
        const user = await db_1.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                password: hashedPassword,
                customerCode: Math.random().toString(36).substring(2, 8)
            }
        });
        return user;
    }
    static async login(email, password) {
        const user = await db_1.prisma.user.findUnique({ where: { email } });
        if (!user)
            throw new Error("User not found");
        const isValid = await bcrypt_1.default.compare(password, user.password);
        if (!isValid)
            throw new Error("Invalid password");
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return { token };
    }
}
exports.AuthService = AuthService;
