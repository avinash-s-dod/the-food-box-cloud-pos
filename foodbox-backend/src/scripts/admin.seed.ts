import { connectDB } from "../config/db.js";
import { AdminModel } from "../modules/admin/admin.model.js";
import { AdminRole } from "../modules/admin/admin.types.js";

// Script: Seed Admin Account
// Description: Connects to MongoDB, checks if default admin exists, and seeds default admin account if not found
const seedAdmin = async () => {
  try {
    await connectDB();
    const existingAdmin = await AdminModel.findOne({
      email: "admin@foodbox.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    // Creates the initial administrator user profile
    await AdminModel.create({
      name: "FoodBox Admin",
      email: "admin@foodbox.com",
      password: "admin@123", // Password will be hashed in mongoose pre-save middleware
      role: AdminRole.ADMIN,
    });

    console.log("Admin seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding admin:", err);
    process.exit(1);
  }
};

seedAdmin();