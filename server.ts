import { Application } from "oak";
import env from "./env.ts";
import router from "./router.ts";
import { enableCors, errorHandler } from "./middlewares/global.middleware.ts";

// Initialize Oak Application
const app = new Application();

// Enable CORS for All Routes
// NOTE: This is not a secure configuration
app.use(enableCors);

// Handle Errors
app.use(errorHandler);

// Set Routes
app.use(router.routes());

// Start Server
console.log(`Server running: http://localhost:${env.APP_PORT}`);
await app.listen({ port: env.APP_PORT });
