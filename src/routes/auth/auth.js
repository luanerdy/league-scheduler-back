import { signin } from "./signin.js";
import { signup } from "./signup.js";

const auth = (app, connection) => {
    signup(app, connection);
    signin(app, connection);
};

export { auth };
