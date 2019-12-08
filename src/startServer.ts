import "reflect-metadata";

import { Request, Response, NextFunction } from "express";
import express from "express";
import * as bodyParser from "body-parser";

import { createConnection } from "typeorm";
import { Server } from "http";
import { Story } from "./entity/Story";
import { User } from "./entity/User";
import { AppRoutes } from "./routes";

let myLogger = function(
    request: Request, response: Response, next: NextFunction) {
    console.log(`${request.method}: ${request.url}`);
    next();
}

let checkApiKeyPresent = function(
    request: Request, response: Response, next: NextFunction
) {
    const api_key = request.header('X-STORY-AUTH');
    if (request.url != '/register') {
        if (!api_key) {
            response.send({
                'message': 'Forbidden. No api_key present',
                'code': 401
            });
            next();
        }
    }
    next();
}

export default async (E2E_TEST: boolean = false): Promise<Server> => {
    // create express app
    const app = express();
    app.use(bodyParser.json());
    app.use(myLogger);
    app.use(checkApiKeyPresent);

    try {
        await createConnection({
            type: "sqlite",
            database: "user-story.db",
            entities: [
                Story, User
            ],
            synchronize: true,
            logging: false,
            dropSchema: E2E_TEST
        });

        // register all application routes
        AppRoutes.forEach(route => {
            app[route.method](route.path, (request: Request, response: Response, next: Function) => {
                route.action(request, response)
                    .then(() => next)
                    .catch(err => next(err));
            });
        });

        // run app
        const PORT = 8000;
        return app.listen(PORT, () => console.log(
            "Express application is up and running on port 8000"));
    } catch (error) {
        throw new Error(`Error while launching server: ${error}`);
    }
}
