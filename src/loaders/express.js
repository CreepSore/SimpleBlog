"use strict";
const express = require("express");
const sessions = require("express-session");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const userMiddleware = require("../web/middleware/user-middleware");

/**
 * @typedef {import("../config/config-model").WebConfig} WebConfig
 */

module.exports = class SequelizeLoader {
    /**
     * @param {WebConfig} webConfig 
     */
    constructor(webConfig) {
        this._webConfig = webConfig;
    }

    /**
     * @returns {express.Application}
     */
    load() {
        const app = express();
        app.use(sessions({
            secret: this._webConfig.sessionSecret,
            saveUninitialized: false,
            resave: false
        }));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.text());
        app.use(bodyParser.raw());
        app.use(helmet({
            // TODO: Disable this after testing
            contentSecurityPolicy: false
        }));

        app.listen(this._webConfig.port, this._webConfig.listenAddress);

        this.setupHelperMiddleware(app);
        this.setupApiRoutes(app);
        this.setupViewRoutes(app);

        return app;
    }

    /**
     * @param {express.Application} app
     */
    setupHelperMiddleware(app) {
        app.use(userMiddleware);
    }

    /**
     * @param {express.Application} app
     */
    setupViewRoutes(app) {

    }

    /**
     * @param {express.Application} app
     */
    setupApiRoutes(app) {
        app.post("/api/v1/login", require("../web/api/v1/login"));
    }
}
