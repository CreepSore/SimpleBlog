"use strict";
/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 * @typedef {import("express").NextFunction} NextFunction
 */

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @param {ServiceCollection} serviceCollection
 */
module.exports = (req, res, next) => {
    res.render("register");
};
