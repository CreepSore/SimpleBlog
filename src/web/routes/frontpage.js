"use strict";
const {Article} = require("../../model/article");

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
module.exports = async(req, res, next) => {
    const articles = await Article.findAll({
        order: [["createdAt", "desc"]],
        limit: 10
    });

    res.render("frontpage", {
        user: req.blog?.user,
        nav: req.nav,
        articles
    });
};
