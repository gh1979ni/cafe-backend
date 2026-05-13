"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../config/prisma"));
const getAllUsers = async () => {
    return prisma_1.default.user.findMany({
        orderBy: { createdAt: "desc" }
    });
};
const updateRole = async (id, role) => {
    return prisma_1.default.user.update({
        where: { id },
        data: { role }
    });
};
const deleteUser = async (id) => {
    return prisma_1.default.user.delete({
        where: { id }
    });
};
exports.default = {
    getAllUsers,
    updateRole,
    deleteUser
};
