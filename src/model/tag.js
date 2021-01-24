"use strict";
const {Model, DataTypes} = require("sequelize");

class Tag extends Model {}

module.exports = {
    Tag,
    /** @param {import("sequelize").Sequelize} sequelize */
    setup: (sequelize) => {
        Tag.init({
            name: {type: DataTypes.STRING(32), allowNull: true}
        }, {
            sequelize: sequelize,
            freezeTableName: true,
            tableName: "tag"
        })
    }
};
