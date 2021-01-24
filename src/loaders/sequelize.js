"use strict";
const { seq } = require("async");
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

        const {User, setup: setupUser} = require("../model/user");
        const {Article, setup: setupArticle} = require("../model/article");
        const {Tag, setup: setupTag} = require("../model/tag");
        const {ActionHistory, setup: setupActionHistory} = require("../model/action_history");
        const {Image, setup: setupImage} = require("../model/image");

        setupUser(sequelize);
        setupArticle(sequelize);
        setupTag(sequelize);
        setupActionHistory(sequelize);
        setupImage(sequelize);

        Article.belongsToMany(Tag, {through: "article_tags", foreignKey: "article_id"});
        Tag.belongsToMany(Article, {through: "article_tags", foreignKey: "tag_id"});

        User.hasMany(ActionHistory, {foreignKey: "user_uuid"});
        ActionHistory.belongsTo(User, {foreignKey: "user_uuid"});

        sequelize.sync({logging: false});
        return sequelize;
    }
}
