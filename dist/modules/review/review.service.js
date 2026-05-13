"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const db_1 = require("../../config/db");
class ReviewService {
    static async create(userId, menuItemId, rating, comment) {
        return db_1.prisma.review.create({
            data: {
                userId,
                menuItemId,
                rating,
                comment
            }
        });
    }
    static async getByMenuItem(menuItemId) {
        return db_1.prisma.review.findMany({
            where: { menuItemId },
            include: { user: true }
        });
    }
}
exports.ReviewService = ReviewService;
