import "reflect-metadata";
import express from 'express';
import container from "./config/inversify.config";
import { InversifyExpressServer } from "inversify-express-utils";
import morgan from 'morgan';

import './controller/post.controller';

const app = express();

const router = express.Router({
    caseSensitive: false,
    mergeParams: false,
    strict: false
});

const server = new InversifyExpressServer(container, router, { rootPath: "/api/v1" }, app);
server.setErrorConfig((app) => {
    app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });
}).setConfig((app) => {
    const logger = morgan('combined');
    app.use(logger);
}).build().listen(3001, 'localhost',() => `Server on!!`);