"use strict";
const {Sequelize} = require("sequelize");

/**
 * @typedef {import("../config/config-model").DbConfig} DbConfig
 */

module.exports = class SequelizeLoader {
    /**
     * @param {DbConfig} dbConfig 
     */
    constructor(dbConfig) {
        this._dbConfig = dbConfig;
    }

    /**
     * @returns {Sequelize}
     */
    load() {
        const sequelize = new Sequelize({
            host: this._dbConfig.hostname,
            port: this._dbConfig.port,
            username: this._dbConfig.username,
            password: this._dbConfig.password,
            database: this._dbConfig.database,
            dialect: this._dbConfig.dialect
        });

        return sequelize;
    }
}
