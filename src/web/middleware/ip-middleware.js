"use strict";
const StatisticsService = require("../../service/statistics-service");
const {RequestStatistics} = require("../../model/request-statistics");

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
    const additionalData = {
        method: req.method,
        url: req.url,
        originalUrl: req.originalUrl,
        params: req.params,
        query: req.query,
        session: req.session
    };

    RequestStatistics.create({
        ip: StatisticsService.getIpFromRequest(req),
        date: new Date(),
        additionalData: additionalData
    });

    next();
};
