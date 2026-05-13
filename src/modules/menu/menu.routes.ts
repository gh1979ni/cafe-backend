import { Router } from "express";
import { MenuController } from "./menu.controller";

const router = Router();

router.post("/", MenuController.create);
router.get("/", MenuController.getAll);
router.put("/:id", MenuController.update);
router.delete("/:id", MenuController.delete);

export default router;