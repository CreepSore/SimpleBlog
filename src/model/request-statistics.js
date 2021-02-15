"use strict";
const StatisticsService = require("../service/statistics-service");
const {Model, DataTypes} = require("sequelize");

class RequestStatistics extends Model {}

module.exports = {
    RequestStatistics,
    /** @param {import("sequelize").Sequelize} sequelize */
    setup: (sequelize) => {
        RequestStatistics.init({
            ip: {
                type: DataTypes.BIGINT,
                allowNull: false,
                set(ip) {
                    this.setDataValue("ip", StatisticsService.ipToNumber(ip));
                },
                get() {
                    return StatisticsService.numberToIp(this.getDataValue("ip"));
                }
            },
            date: { type: DataTypes.DATE, allowNull: false },
            additionalData: {
                type: DataTypes.TEXT({length: "long"}),
                allowNull: true,
                get() {
                    return JSON.parse(this.getDataValue("additionalData"));
                },
                set(val) {
                    return this.setDataValue("additionalData", JSON.stringify(val));
                }
            }
        }, {
            sequelize: sequelize,
            freezeTableName: true,
            tableName: "statistic_requests",
            timestamps: false
        })
    }
};
