import {Router} from "express";

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { CategoryController } from "./category.controller.js";

const router = Router();

router.post("/", authMiddleware(["ADMIN"]), CategoryController.createCategory);

export default router;