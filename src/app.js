import { customExpress } from "./config/customExpress.js";
import { routes } from "./routes/routes.js";

const app = customExpress();
routes(app);

export { app };
