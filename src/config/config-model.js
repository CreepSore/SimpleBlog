"use strict";

/**
 * @typedef {Object} WebConfig
 * @property {String} listenAddress
 * @property {Number} port
 * @property {String} sessionSecret
 * @property {String} imageRoot
 */

/**
 * @typedef {Object} DbConfig
 * @property {String} hostname
 * @property {Number} port
 * @property {String} username
 * @property {String} password
 * @property {String} database
 * @property {String} dialect
 */

module.exports = class ConfigModel {
    constructor() {
        /** @type {WebConfig} */
        this.webConfig = {
            listenAddress: "127.0.0.1",
            port: 8080,
            sessionSecret: "SECRET",
            imageRoot: "/path/to/images/"
        };

        /** @type {DbConfig} */
        this.dbConfig = {
            hostname: "localhost",
            port: 3306,
            username: "username",
            password: "password",
            database: "database/schema",
            dialect: "mariadb"
        }
    }

    static checkModel(model) {
        const defaultKeys = Object.keys(new ConfigModel());
        const keys = Object.keys(model);

        for(let i = 0; i < defaultKeys.length; i++) {
            if(!keys.includes(defaultKeys[i])) {
                return false;
            }
        }

        return true;
    }
}
