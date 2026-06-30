import { connectDB } from "../config/db.js";
import { AdminModel } from "../modules/admin/admin.model.js";
import { AdminRole } from "../modules/admin/admin.types.js";

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
    await AdminModel.create({
      name: "FoodBox Admin",
      email: "admin@foodbox.com",
      password: "admin@123",
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