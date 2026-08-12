import bcrypt from "bcrypt";
import { AppError } from "../../common/AppError.js";
import { generateToken } from "../../utils/jwt.js";
import { CustomerModel } from "./customer.model.js";
import type {
  ChangePasswordInput,
  CreateCustomerInput,
  CustomerLoginInput,
  changePasswordSchema,
  UpdateCustomerInput,
} from "./customer.schema.js";
import type { CustomerQueryParams } from "./customer.types.js";
import { ApiFeatures } from "../../common/ApiFeatures.js";
import { logger } from "../../logger/logger.js";

// Service: Register Customer
// Description: Checks if the phone or email is already registered, then saves the new customer profile
const createCustomer = async (payload: CreateCustomerInput) => {
  const existingCustomer = await CustomerModel.findOne({
    isDeleted: false,
    $or: [
      { phone: payload.phone },
      ...(payload.email ? [{ email: payload.email }] : []),
    ],
  });

  if (existingCustomer) {
    throw AppError.conflict("User already exists");
  }

  const customer = await CustomerModel.create(payload);
  return customer;
};

// Service: Get Customers
// Description: Filters, searches, and paginates customer documents
const getCustomers = async (queryParams?: CustomerQueryParams) => {
  const features = new ApiFeatures(CustomerModel.find(), queryParams ?? {})
    .filter()
    .sort()
    .search(["name", "phone", "email"]);

  const paginationMeta = await features.getPaginationMeta();
  features.paginate();

  const customers = await features.query.select("-password -__v");

  return { customers, paginationMeta };
};

// Service: Customer Login
// Description: Authenticates credentials using either email or phone and returns token
const customerLogin = async (payload: CustomerLoginInput) => {
  const { email, phone, password } = payload;

  const customer = await CustomerModel.findOne({
    isDeleted: false,
    ...(phone ? { phone } : { email }),
  }).select("+password -__v");

  if (!customer) {
    throw AppError.unauthorized("Invalid email/phone or password");
  }

  const isPasswordMatched = await bcrypt.compare(password, customer.password);

  if (!isPasswordMatched) {
    throw AppError.unauthorized("Invalid email/phone or password");
  }

  const token = generateToken({
    id: customer.id,
    role: customer.role,
  });

  logger.info("Customer logged in successfully", { customerId: customer.id });

  const customerResponse = customer.toObject();

  const { password: _, ...customerData } = customerResponse;

  return {
    token,
    customer: customerData,
  };
};

// Service: Get Customer Profile
// Description: Fetches profile data of customer by ID
const getCustomerProfile = async (customerId: string) => {
  const customer =
    await CustomerModel.findById(customerId).select("-password -__v");

  if (!customer) {
    throw AppError.notFound("User not found");
  }

  return customer;
};

// Service: Update Profile
// Description: Updates basic profile fields of a customer
const updateProfile = async (id: string, payload: UpdateCustomerInput) => {
  const updatedCustomer = await CustomerModel.findByIdAndUpdate(id, payload, {
    returnDocument: "after",
    runValidators: true,
  }).select("-password -__v");

  if (!updatedCustomer) {
    throw AppError.notFound("User not found");
  }

  return updatedCustomer;
};

// Service: Change Password
// Description: Verifies current password and sets a new hashed password
const changePassword = async (id: string, payload: ChangePasswordInput) => {
  const customer = await CustomerModel.findOne({
    _id: id,
    isDeleted: false,
  }).select("+password");

  if (!customer) {
    throw AppError.notFound("User not found");
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.currentPassword,
    customer.password,
  );

  if (!isPasswordMatched) {
    throw AppError.badRequest("Current password is incorrect");
  }

  const isSamePassword = await bcrypt.compare(
    payload.newPassword,
    customer.password,
  );

  if (isSamePassword) {
    throw AppError.badRequest(
      "New password must be different from current password",
    );
  }

  customer.password = payload.newPassword;

  await customer.save(); // pre-save middleware will automatically re-hash the new password

  return {
    message: "Password updated successfully",
  };
};

// Service: Delete Customer
// Description: Soft deletes customer by marking isDeleted as true
const deleteCustomer = async (id: string) => {
  const deletedCustomer = await CustomerModel.findOneAndUpdate(
    { _id: id, isDeleted: false },
    {
      isDeleted: true,
    },
    {
      returnDocument: "after",
    },
  ).select("-__v");

  if (!deletedCustomer) {
    throw AppError.notFound("User not found");
  }

  return deletedCustomer;
};

export const CustomerService = {
  createCustomer,
  customerLogin,
  getCustomerProfile,
  updateProfile,
  deleteCustomer,
  getCustomers,
  changePassword,
};
