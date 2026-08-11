import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { CustomerController } from "./customer.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  changePasswordSchema,
  createCustomerSchema,
  customerLoginSchema,
  customerQuerySchema,
  updateCustomerSchema,
} from "./customer.schema.js";
import { idParamSchema } from "../../common/common.schema.js";
import { AdminRole } from "../admin/admin.types.js";
import { CustomerRole } from "./customer.types.js";

const router = Router();

router.post(
  "/register",
  authMiddleware([AdminRole.ADMIN, CustomerRole.USER]),
  validate(createCustomerSchema, "body"),
  CustomerController.createCustomer,
);

router.post(
  "/login",
  validate(customerLoginSchema, "body"),
  CustomerController.customerLogin,
);

router.put(
  "/password",
  authMiddleware([CustomerRole.USER]),
  validate(changePasswordSchema, "body"),
  CustomerController.changePassword,
);

router.get(
  "/:id",
  authMiddleware([AdminRole.ADMIN, CustomerRole.USER]),
  validate(idParamSchema, "params"),
  CustomerController.getCustomerProfile,
);

router.get(
  "/",
  authMiddleware([AdminRole.ADMIN]),
  validate(customerQuerySchema, "query"),
  CustomerController.getCustomers,
);

router.put(
  "/:id",
  authMiddleware([AdminRole.ADMIN, CustomerRole.USER]),
  validate(idParamSchema, "params"),
  validate(updateCustomerSchema, "body"),
  CustomerController.updateProfile,
);

router.delete(
  "/:id",
  authMiddleware([AdminRole.ADMIN, CustomerRole.USER]),
  validate(idParamSchema, "params"),
  CustomerController.deleteCustomer,
);

export { router as CustomerRouter };
