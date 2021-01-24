"use strict";
const path = require("path");
const ConfigHandler = require("./config/config");
const SequelizeLoader = require("./loaders/sequelize");
const ExpressLoader = require("./loaders/express");

module.exports = class ApplicationLoader {
    constructor() {
        this.configHandler = this._setupConfig();
        this.cfg = this.configHandler.getConfig();
        this.sequelize = new SequelizeLoader(this.cfg.dbConfig).load();
        this.express = new ExpressLoader(this.cfg.webConfig).load();
    }

    start() {
        
    }

    stop() {

    }

    /**
     * @returns {ConfigHandler}
     */
    _setupConfig() {
        const configHandler = new ConfigHandler(__dirname, __dirname);
        configHandler.exportTemplate();
        if(!configHandler.getConfig()) throw new Error(`Config file couldn't be found at [${this.configHandler._cfgpath}]`);
        return configHandler;
    }
};
