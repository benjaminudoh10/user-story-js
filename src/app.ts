import "reflect-metadata";

import { Request, Response } from "express";
import express from "express";
import * as bodyParser from "body-parser";

import { createConnection } from "typeorm";
import { Story } from "./entity/Story";
import { User } from "./entity/User";
import { AppRoutes } from "./routes";

createConnection({
    type: "sqlite",
    database: "user-story.db",
    entities: [
        Story, User
    ],
    synchronize: true,
    logging: false
}).then(async connection => {
    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register all application routes
    AppRoutes.forEach(route => {
        app[route.method](route.path, (request: Request, response: Response, next: Function) => {
            route.action(request, response)
                .then(() => next)
                .catch(err => next(err));
        });
    });

    // run app
    app.listen(8000);

    console.log("Express application is up and running on port 8000");

}).catch(error => console.log(error));
