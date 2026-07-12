import { Router } from "express";
import {authMiddleware} from "../../middlewares/auth.middleware.js";
import { MenuController } from "./menu.controller.js";

const router = Router();

router.post("/", authMiddleware(["ADMIN"]), MenuController.createMenu);
router.get("/", MenuController.getMenus);
router.get("/:id", MenuController.getMenuById);
router.put("/:id", authMiddleware(["ADMIN"]), MenuController.updateMenuById);
router.delete("/:id", authMiddleware(["ADMIN"]), MenuController.deleteMenuById);

export { router as MenuRouter };
