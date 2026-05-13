import { Router } from "express";
import { UserController } from "./user.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { adminMiddleware } from "../../middleware/admin.middleware";

const router = Router();

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  UserController.getAll
);

router.patch(
  "/:id/role",
  authMiddleware,
  adminMiddleware,
  UserController.updateRole
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  UserController.deleteUser
);

export default router;