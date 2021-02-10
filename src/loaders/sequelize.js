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
        const {Comment, setup: setupComment} = require("../model/comment");
        const {RequestStatistics, setup: setupRequestStatistics} = require("../model/request-statistics");

        setupUser(sequelize);
        setupArticle(sequelize);
        setupTag(sequelize);
        setupActionHistory(sequelize);
        setupImage(sequelize);
        setupComment(sequelize);
        setupRequestStatistics(sequelize);

        Article.belongsToMany(Tag, {through: "article_tags", foreignKey: "article_id"});
        Tag.belongsToMany(Article, {through: "article_tags", foreignKey: "tag_id"});

        Article.hasMany(Comment, {foreignKey: "a_id"});
        Comment.belongsTo(Article, {foreignKey: "a_id"});

        User.hasMany(Comment, {foreignKey: "u_id"});
        Comment.belongsTo(User, {foreignKey: "u_id"});

        User.hasMany(ActionHistory, {foreignKey: "user_uuid"});
        ActionHistory.belongsTo(User, {foreignKey: "user_uuid"});

        sequelize.sync({logging: false});
        return sequelize;
    }
}
