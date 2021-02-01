"use strict";
const { Article } = require("../../model/article");
const { Tag } = require("../../model/tag");

/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 * @typedef {import("express").NextFunction} NextFunction
 */

module.exports = async(req, res, next) => {
    const articles = await Article.findAll({
        order: [["updatedAt", "DESC"]],
        include: [Tag]
    });

    res.render("article_index", {
        nav: req.nav,
        articles,
        showAdminUtils: !!req.blog?.user
    });
};
