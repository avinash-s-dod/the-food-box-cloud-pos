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

// Initialize Router for Customer module
const router = Router();

// Route: POST /api/customers/register
// Description: Create/Register a new customer (Admin or Customer role access)
router.post(
  "/register",
  authMiddleware([AdminRole.ADMIN, CustomerRole.USER]),
  validate(createCustomerSchema, "body"), // Validate request body using schema
  CustomerController.createCustomer,
);

// Route: POST /api/customers/login
// Description: Log in a customer using phone or email and password
router.post(
  "/login",
  validate(customerLoginSchema, "body"), // Validate email/phone format
  CustomerController.customerLogin,
);

// Route: PUT /api/customers/password
// Description: Change current customer password (Customer role access only)
router.put(
  "/password",
  authMiddleware([CustomerRole.USER]),
  validate(changePasswordSchema, "body"),
  CustomerController.changePassword,
);

// Route: GET /api/customers/:id
// Description: Retrieve profile details of customer by ID (Admin or Customer access)
router.get(
  "/:id",
  authMiddleware([AdminRole.ADMIN, CustomerRole.USER]),
  validate(idParamSchema, "params"),
  CustomerController.getCustomerProfile,
);

// Route: GET /api/customers
// Description: List/Query all customers with pagination, sorting, search (Admin access only)
router.get(
  "/",
  authMiddleware([AdminRole.ADMIN]),
  validate(customerQuerySchema, "query"),
  CustomerController.getCustomers,
);

// Route: PUT /api/customers/:id
// Description: Update details of customer by ID (Admin or Customer access)
router.put(
  "/:id",
  authMiddleware([AdminRole.ADMIN, CustomerRole.USER]),
  validate(idParamSchema, "params"),
  validate(updateCustomerSchema, "body"),
  CustomerController.updateProfile,
);

// Route: DELETE /api/customers/:id
// Description: Soft delete customer profile (Admin or Customer access)
router.delete(
  "/:id",
  authMiddleware([AdminRole.ADMIN, CustomerRole.USER]),
  validate(idParamSchema, "params"),
  CustomerController.deleteCustomer,
);

export { router as CustomerRouter };
