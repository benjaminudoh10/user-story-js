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
        path: "/api/v1/register",
        method: "post",
        action: createUser
    },
    {
        path: "/api/v1/story",
        method: "post",
        action: createUserStory
    },
    {
        path: "/api/v1/story/:id/assign",
        method: "put",
        action: assignStoryToAdmin
    },
    {
        path: "/api/v1/stories/admin",
        method: "get",
        action: adminGetAllStories
    },
    {
        path: "/api/v1/stories",
        method: "get",
        action: userGetAllStories
    },
    {
        path: "/api/v1/story/:id/:action",
        method: "put",
        action: adminProcessStories
    }
];
