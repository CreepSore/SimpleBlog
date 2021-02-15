"use strict";
const {Op, Sequelize} = require("sequelize");
const StatisticsService = require("../../../service/statistics-service");
const { RequestStatistics } = require("../../../model/request-statistics");

const entriesPerPage = 50;

/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 * @typedef {import("express").NextFunction} NextFunction
 */

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
module.exports = async(req, res, next) => {
    if(!req.blog?.user) {
        return res.redirect("/");
    }
    const convertedIp = StatisticsService.ipToNumber(StatisticsService.getIpFromRequest(req));
    const filter = (req.query.filter || "").split(",").map(ip => StatisticsService.ipToNumber(ip));
    const requests = await RequestStatistics.findAll({
        where: {
            ip: {
                [Op.ne]: convertedIp,
                [Op.notIn]: filter
            }
        },
        order: [["date", "DESC"]]
    });

    const ips = await RequestStatistics.findAll({
        group: ["ip"],
        attributes: {
            include: [
                [Sequelize.fn("COUNT", Sequelize.col("date")), "count"],
                [Sequelize.fn("MAX", Sequelize.col("date")), "lastRequest"],
                [Sequelize.fn("MIN", Sequelize.col("date")), "firstRequest"]
            ]
        },
        order: [[Sequelize.col("lastRequest"), "DESC"]]
    });

    res.render("statistics/index", {
        nav: req.nav,
        requests,
        ips
    });
};
