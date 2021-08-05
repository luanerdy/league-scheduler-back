import { connection } from "../config/database.js";
import { auth } from "./auth/auth.js";
import { groups } from "./groups/groups.js";

const routes = (app) => {
    auth(app, connection);
    groups(app, connection);
};

export { routes };
