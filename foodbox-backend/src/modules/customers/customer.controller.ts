import { catchAsync } from "../../common/catchAsync.js";
import { sendResponse } from "../../common/sendResponse.js";
import type {
  CustomerLoginInput,
  CreateCustomerInput,
  UpdateCustomerInput,
  ChangePasswordInput,
} from "./customer.schema.js";
import { CustomerService } from "./customer.service.js";
import type { CustomerQueryParams, CustomerParams } from "./customer.types.js";

// Handler: Create Customer
// Description: Registers a new customer and returns the created customer profile
const createCustomer = catchAsync<
  Record<string, string>,
  unknown,
  CreateCustomerInput
>(async (req, res) => {
  const result = await CustomerService.createCustomer(req.body);

  return sendResponse(res, 201, "User registered successfully", result);
});

// Handler: Customer Login
// Description: Auths customer credentials (phone/email & password) and returns JWT token & user profile
const customerLogin = catchAsync<
  Record<string, string>,
  unknown,
  CustomerLoginInput
>(async (req, res) => {
  const customer = await CustomerService.customerLogin(req.body);

  return sendResponse(res, 200, "User logged in successfully", customer);
});

// Handler: Get Customer Profile
// Description: Retrieves profile details of customer by MongoDB ID
const getCustomerProfile = catchAsync<CustomerParams>(async (req, res) => {
  const customer = await CustomerService.getCustomerProfile(req.params.id);

  return sendResponse(res, 200, "User details fetched successfully", customer);
});

// Handler: Get Customers
// Description: Retrieves a filtered/paginated list of customer profiles
const getCustomers = catchAsync<CustomerQueryParams>(async (req, res) => {
  const result = await CustomerService.getCustomers(req.query);

  return sendResponse(
    res,
    200,
    "Users fetched successfully",
    result.customers,
    result.paginationMeta,
  );
});

// Handler: Update Profile
// Description: Updates editable profile fields of a customer profile
const updateProfile = catchAsync<CustomerParams, unknown, UpdateCustomerInput>(
  async (req, res) => {
    const result = await CustomerService.updateProfile(req.params.id, req.body);

    return sendResponse(res, 200, "User details updated successfully", result);
  },
);

// Handler: Delete Customer
// Description: Soft deletes a customer profile
const deleteCustomer = catchAsync<CustomerParams>(async (req, res) => {
  const result = await CustomerService.deleteCustomer(req.params.id);

  return sendResponse(res, 200, "User deleted successfully", result);
});

// Handler: Change Password
// Description: Verifies current password and updates it to the new requested password
const changePassword = catchAsync<
  Record<string, string>,
  unknown,
  ChangePasswordInput
>(async (req, res) => {
  console.log('req.user!.id',req.user!.id)
  await CustomerService.changePassword(req.user!.id, req.body);

  return sendResponse(res, 200, "Password changed successfully");
});

export const CustomerController = {
  createCustomer,
  customerLogin,
  getCustomerProfile,
  getCustomers,
  updateProfile,
  deleteCustomer,
  changePassword,
};
