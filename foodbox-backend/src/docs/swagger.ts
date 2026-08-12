import swaggerJSDoc from "swagger-jsdoc";
import { env } from "../config/env.js";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.3",

    info: {
      title: "FoodBox API",
      version: "1.0.0",
      description: "API documentation for the FoodBox Cloud Kitchen POS",
    },

    servers: [
      {
        url: `http://localhost:${env.PORT}`,
        description: "Local development server",
      },
    ],

    tags: [
      { name: "Admin", description: "Admin Authentication & Profile operations" },
      { name: "Category", description: "Category management operations" },
      { name: "Menu", description: "Menu items management operations" },
      { name: "Order", description: "Order placement & status management operations" },
      { name: "Customer", description: "Customer accounts, authentication & profiles" },
      { name: "Settings", description: "Restaurant configuration settings" },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },

  apis: ["./src/docs/**/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
