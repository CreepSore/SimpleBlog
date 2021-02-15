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
    const requests = await RequestStatistics.findAll({
        where: {
            ip: StatisticsService.ipToNumber(req.params.ip)
        },
        order: [["date", "DESC"]]
    });

    res.render("statistics/ip", {
        nav: req.nav,
        requests
    });
};
