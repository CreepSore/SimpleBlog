"use strict";
const uuid = require("uuid");
const {Model, DataTypes} = require("sequelize");

class Image extends Model {}

module.exports = {
    Image,
    /** @param {import("sequelize").Sequelize} sequelize */
    setup: (sequelize) => {
        Image.init({
            uuid: {
                type: DataTypes.STRING(36),
                primaryKey: true,
                defaultValue: () => uuid.v4()
            },
            relativePath: {type: DataTypes.STRING(255), allowNull: false}
        }, {
            sequelize: sequelize,
            freezeTableName: true,
            tableName: "image"
        })
    }
};
