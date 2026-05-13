"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const review_service_1 = require("./review.service");
class ReviewController {
    static async create(req, res) {
        const userId = req.user?.id;
        const { menuItemId, rating, comment } = req.body;
        const review = await review_service_1.ReviewService.create(userId, menuItemId, rating, comment);
        res.json(review);
    }
    static async getByMenuItem(req, res) {
        const menuItemId = req.params.menuItemId;
        const reviews = await review_service_1.ReviewService.getByMenuItem(menuItemId);
        res.json(reviews);
    }
}
exports.ReviewController = ReviewController;
