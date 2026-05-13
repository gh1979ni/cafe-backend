import { Router } from "express";
import { ReviewController } from "./review.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.post("/", authMiddleware, ReviewController.create);
router.get("/:menuItemId", ReviewController.getByMenuItem);

export default router;