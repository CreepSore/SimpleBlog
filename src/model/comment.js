"use strict";
const crypto = require("crypto");
const uuid = require("uuid");
const {Model, DataTypes} = require("sequelize");

class Comment extends Model {}

module.exports = {
    Comment,
    /** @param {import("sequelize").Sequelize} sequelize */
    setup: (sequelize) => {
        Comment.init({
            text: DataTypes.TEXT
        }, {
            sequelize: sequelize,
            freezeTableName: true,
            tableName: "comment"
        })
    }
};
