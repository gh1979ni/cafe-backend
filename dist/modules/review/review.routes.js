"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const review_controller_1 = require("./review.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.authMiddleware, review_controller_1.ReviewController.create);
router.get("/:menuItemId", review_controller_1.ReviewController.getByMenuItem);
exports.default = router;
