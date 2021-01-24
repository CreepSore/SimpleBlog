"use strict";
const crypto = require("crypto");
const uuid = require("uuid");
const {Model, DataTypes} = require("sequelize");

class User extends Model {}

module.exports = {
    User,
    /** @param {import("sequelize").Sequelize} sequelize */
    setup: (sequelize) => {
        User.init({
            uuid: {
                type: DataTypes.STRING(36),
                primaryKey: true,
                defaultValue: () => uuid.v4()
            },
            username: { type: DataTypes.STRING(32), allowNull: false },
            email: { type: DataTypes.STRING(255), allowNull: true },
            password: {
                type: DataTypes.STRING(64),
                allowNull: true,
                set(value) {
                    this.setDataValue("password", crypto.createHash("SHA256").update(value).digest().toString());
                }
            }
        }, {
            sequelize: sequelize,
            freezeTableName: true,
            tableName: "user"
        })
    }
};
