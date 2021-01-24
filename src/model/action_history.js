"use strict";
const {Model, DataTypes} = require("sequelize");

class ActionHistory extends Model {}

module.exports = {
    ActionHistory,
    /** @param {import("sequelize").Sequelize} sequelize */
    setup: (sequelize) => {
        ActionHistory.init({
            action: {type: DataTypes.STRING(32), allowNull: true},
            data: {type: DataTypes.TEXT, allowNull: true}
        }, {
            sequelize: sequelize,
            freezeTableName: true,
            tableName: "action_history"
        })
    }
};
