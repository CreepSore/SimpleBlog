"use strict";
const {Op} = require("sequelize");
const StatisticsService = require("../../service/statistics-service");
const { RequestStatistics } = require("../../model/request-statistics");

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
    const page = (req.query.page || 1) - 1;
    const statistics = await RequestStatistics.findAll({offset: page * entriesPerPage, limit: entriesPerPage, where: {ip: { [Op.ne]: StatisticsService.ipToNumber(StatisticsService.getIpFromRequest(req)) }}, order: [["date", "DESC"]]});

    res.render("statistics", {
        nav: req.nav,
        statistics
    });
};
