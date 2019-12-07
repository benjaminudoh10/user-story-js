import { createUser } from "./controllers/createUser";
import { createUserStory } from "./controllers/createUserStory";
import { assignStoryToAdmin } from "./controllers/assignStoryToAdmin";
import { adminGetAllStories } from "./controllers/adminGetAllStories";
import { adminProcessStories } from "./controllers/adminProcessStories";
import { userGetAllStories } from "./controllers/userGetAllStories";

/**
 * All application routes.
 */
export const AppRoutes = [
    {
        path: "/register",
        method: "post",
        action: createUser
    },
    {
        path: "/story",
        method: "post",
        action: createUserStory
    },
    {
        path: "/story/:id/assign",
        method: "put",
        action: assignStoryToAdmin
    },
    {
        path: "/stories/admin",
        method: "get",
        action: adminGetAllStories
    },
    {
        path: "/stories",
        method: "get",
        action: userGetAllStories
    },
    {
        path: "/stories/:id/:action",
        method: "put",
        action: adminProcessStories
    }
];
