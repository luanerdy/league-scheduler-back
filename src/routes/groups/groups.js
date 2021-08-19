import { newGroup } from "./newGroup.js";
import { getGroups } from "./getGroups.js";

const groups = (app, connection) => {
    newGroup(app, connection);
    getGroups(app, connection);
};

export { groups };
