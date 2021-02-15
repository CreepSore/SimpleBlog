"use strict";
const path = require("path");
const express = require("express");
const sessions = require("express-session");
const fileUpload = require("express-fileupload");
const helmet = require("helmet");

const userMiddleware = require("../web/middleware/user-middleware");
const serviceMiddleware = require("../web/middleware/service-middleware");
const navMiddleware = require("../web/middleware/nav-middleware");
const trackerMiddleware = require("../web/middleware/ip-middleware");

const ImageService = require("../service/image-service");

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
        app.use(helmet({
            contentSecurityPolicy: false
        }));
        app.use(fileUpload({
            abortOnLimit: true,
            safeFileNames: true,
            preserveExtension: true,
            createParentPath: true
        }));
        app.use(express.static(path.join(__dirname, "..", "web", "static")));
        app.use(express.json());
        app.use(express.urlencoded({extended: true}));
        app.use(express.text());
        app.use(express.raw());
        app.use(helmet({
            // TODO: Disable this after testing
            contentSecurityPolicy: false
        }));

        app.set("views", path.join(__dirname, "..", "web", "views"));
        app.set("view engine", "ejs");

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
        app.use((req, res, next) => serviceMiddleware(req, res, next, {
            imageService: new ImageService(this._webConfig.imageRoot)
        }));
        app.use(trackerMiddleware);
        app.use(userMiddleware);
        app.use(navMiddleware);
    }

    /**
     * @param {express.Application} app
     */
    setupViewRoutes(app) {
        app.get("/login", require("../web/routes/login"));
        app.get("/register", require("../web/routes/register"));
        app.get("/", require("../web/routes/frontpage"));
        app.get("/article/edit/:articleId", require("../web/routes/edit_article").get);
        app.get("/article/view/:articleId", require("../web/routes/view_article"));
        app.get("/article/new", require("../web/routes/add_article").get);
        app.post("/article/edit/:articleId", require("../web/routes/edit_article").post);
        app.post("/article/new", require("../web/routes/add_article").post);
        app.get("/article/index", require("../web/routes/index_article"));
        app.get("/statistics", require("../web/routes/statistics/index"));
        app.get("/statistics/ip/:ip", require("../web/routes/statistics/ip"));
    }

    /**
     * @param {express.Application} app
     */
    setupApiRoutes(app) {
        app.post("/api/v1/login", require("../web/api/v1/login"));
        app.post("/api/v1/register", require("../web/api/v1/register"));
        app.get("/api/v1/image/:imageId", require("../web/api/v1/image").get);
        app.post("/api/v1/image", require("../web/api/v1/image").post);
    }
}
