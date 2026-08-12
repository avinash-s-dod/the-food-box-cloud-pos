import { connectDB } from "../config/db.js";
import { CategoryModel } from "../modules/category/category.model.js";

// Default set of category documents to seed
const categories = [
  {
    name: "Sandwiches",
    description: "Freshly grilled and loaded sandwiches.",
  },
  {
    name: "Pizza",
    description: "Stone baked pizzas.",
  },
  {
    name: "Burgers",
    description: "Delicious burgers with fresh ingredients.",
  },
  {
    name: "Wraps",
    description: "Healthy and tasty wraps.",
  },
  {
    name: "Rice Bowls",
    description: "Wholesome rice bowl meals.",
  },
  {
    name: "South Indian",
    description: "Authentic South Indian dishes.",
  },
  {
    name: "Chinese",
    description: "Popular Indo-Chinese favorites.",
  },
  {
    name: "Beverages",
    description: "Refreshing drinks and coolers.",
  },
  {
    name: "Desserts",
    description: "Sweet treats to finish your meal.",
  },
];

// Script: Seed Categories
// Description: Clears current categories and inserts the default initial categories list
const seedCategories = async () => {
  try {
    await connectDB();

    // Clear existing collections records
    await CategoryModel.deleteMany({});

    // Bulk insert default category lists
    await CategoryModel.insertMany(categories);

    console.log("Categories seeded successfully.");

    process.exit(0);
  } catch (error) {
    console.error("Failed to seed categories.", error);
    process.exit(1);
  }
};

seedCategories();