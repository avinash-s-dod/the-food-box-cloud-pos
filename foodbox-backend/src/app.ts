import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger.js";
import { welcomeTemplate } from "./common/welcomeTemplate.js";

// Import module routing files
import { AdminRouter } from "./modules/admin/admin.route.js";
import { CategoryRouter } from "./modules/category/category.route.js";
import { MenuRouter } from "./modules/menu/menu.route.js";
import { OrderRouter } from "./modules/orders/order.route.js";
import { CustomerRouter } from "./modules/customers/customer.route.js";
import { SettingsRouter } from "./modules/settings/setting.route.js";

// Import global error handling middleware
import { errorHandler } from "./middlewares/error.middleware.js";

// Initialize Express App
const app = express();

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Secure Express headers (disable CSP so Swagger and welcome page inline styles/scripts load properly)
app.use(helmet({ contentSecurityPolicy: false }));

// HTTP request logging middleware
app.use(morgan("dev"));

// Body parser middleware to handle incoming json requests
app.use(express.json());

// Route: GET /
// Description: Serves a welcome HTML page displaying backend server info and shortcut link to Swagger UI Docs
app.get("/", (_, res) => {
  res.send(welcomeTemplate);
});

// Swagger documentation endpoint configuration
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      persistAuthorization: true, // Persists authorize key after page refresh
    },
  }),
);

// Route: GET /health
// Description: Simple health check status endpoint
app.get("/health", (_, res) => {
  res.json({
    success: true,
    message: "Server Running",
  });
});

// Configure API module endpoints
app.use("/api/admin", AdminRouter);
app.use("/api/categories", CategoryRouter);
app.use("/api/menu", MenuRouter);
app.use("/api/orders", OrderRouter);
app.use("/api/customers", CustomerRouter);
app.use("/api/settings", SettingsRouter);

// Register global error middleware
app.use(errorHandler);

export default app;
