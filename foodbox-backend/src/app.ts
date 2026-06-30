import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import adminRoutes from "./modules/admin/admin.route.js";
import categoryRoutes from "./modules/category/category.route.js";

import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.get("/health", (_, res) => {
  res.json({
    success: true,
    message: "Server Running",
  });
});

app.use("/api/admin", adminRoutes);

app.use("/api/categories", categoryRoutes);

app.use(errorHandler);

export default app;
