"use strict";
const MarkdownIt = require("markdown-it");
const mdImsize = require("markdown-it-imsize");
const hljs = require("highlight.js");
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
            description: {
                type: DataTypes.TEXT({length: "long"}),
                allowNull: true
            },
            clicks: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            dataMarkdownRendered: {
                type: DataTypes.VIRTUAL,
                get() {
                    return new MarkdownIt({
                        highlight: function (str, lang) {
                            if (lang && hljs.getLanguage(lang)) {
                                try {
                                    const highlighted = hljs.highlight(lang, str);
                                    return highlighted.value;
                                } catch (__) {}
                            }

                            return '';
                        },
                        html: true
                      }).use(mdImsize).render(this.getDataValue("data"));
                }
            }
        }, {
            sequelize: sequelize,
            freezeTableName: true,
            tableName: "article"
        })
    }
};
