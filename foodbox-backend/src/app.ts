import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { AdminRouter } from "./modules/admin/admin.route.js";
import { CategoryRouter } from "./modules/category/category.route.js";
import { MenuRouter } from "./modules/menu/menu.route.js";
import { OrderRouter } from "./modules/orders/order.route.js";
import { CustomerRouter } from "./modules/customers/customer.route.js";
import { SettingsRouter } from "./modules/settings/setting.route.js";

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

app.use("/api/admin", AdminRouter);
app.use("/api/categories", CategoryRouter);
app.use("/api/menu", MenuRouter);
app.use("/api/orders", OrderRouter);
app.use("/api/customers", CustomerRouter);
app.use("/api/settings", SettingsRouter);

app.use(errorHandler);

export default app;
