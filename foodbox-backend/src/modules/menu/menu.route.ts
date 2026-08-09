import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { MenuController } from "./menu.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  createMenuSchema,
  menuQuerySchema,
  updateMenuSchema,
} from "./menu.schema.js";
import { idParamSchema } from "../../common/common.schema.js";

const router = Router();

router.post(
  "/",
  authMiddleware(["ADMIN"]),
  validate(createMenuSchema, "body"),
  MenuController.createMenu,
);

router.get("/", validate(menuQuerySchema, "query"), MenuController.getMenus);

router.get(
  "/:id",
  validate(idParamSchema, "params"),
  MenuController.getMenuById,
);

router.put(
  "/:id",
  authMiddleware(["ADMIN"]),
  validate(idParamSchema, "params"),
  validate(updateMenuSchema, "body"),
  MenuController.updateMenuById,
);

router.delete(
  "/:id",
  authMiddleware(["ADMIN"]),
  validate(idParamSchema, "params"),
  MenuController.deleteMenuById,
);

export { router as MenuRouter };
