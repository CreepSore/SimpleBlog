"use strict";
const MarkdownIt = require("markdown-it");
const uuid = require("uuid");
const {Model, DataTypes} = require("sequelize");

class Article extends Model {}

module.exports = {
    Article,
    /** @param {import("sequelize").Sequelize} sequelize */
    setup: (sequelize) => {
        Article.init({
            uuid: {
                type: DataTypes.STRING(36),
                primaryKey: true,
                defaultValue: () => uuid.v4()
            },
            title: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            data: {
                type: DataTypes.TEXT({length: "long"}),
                allowNull: false
            },
            dataMarkdownRendered: {
                type: DataTypes.VIRTUAL,
                get() {
                    return new MarkdownIt().render(this.getDataValue("data"));
                }
            }
        }, {
            sequelize: sequelize,
            freezeTableName: true,
            tableName: "article"
        })
    }
};
