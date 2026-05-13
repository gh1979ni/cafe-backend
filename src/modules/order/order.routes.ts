import { Router } from "express";
import { OrderController } from "./order.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { adminMiddleware } from "../../middleware/admin.middleware";
const router = Router();
router.post("/", authMiddleware, OrderController.create);
router.get("/", authMiddleware, OrderController.getAll);

router.get(
  "/admin/all",
  authMiddleware,
  adminMiddleware,
  OrderController.getAllAdmin
);
router.put(
  "/admin/:id/status",
  authMiddleware,
  OrderController.updateStatus
);
router.patch(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  OrderController.updateStatus
);
router.get(
  "/dashboard/stats",
  authMiddleware,
  adminMiddleware,
  OrderController.dashboard
);
router.get(
  "/dashboard/top-products",
  authMiddleware,
  adminMiddleware,
  OrderController.topProducts
);
router.get(
  "/dashboard/sales-chart",
  authMiddleware,
  adminMiddleware,
  OrderController.salesChart
);
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  OrderController.getAll
);

export default router;