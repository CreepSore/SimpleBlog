"use strict";
const { Article } = require("../../model/article");

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
    const article = await Article.findByPk(req.params.articleId);
    if(!article) {
        return res.redirect("/");
    }

    req.session.visitedArticles = req.session.visitedArticles || [];
    if(!req.session.visitedArticles.includes(req.params.articleId)) {
        await article.update({clicks: article.clicks + 1}, {silent: true});
    }
    req.session.visitedArticles.push(req.params.articleId);

    res.render("article_view", {
        nav: req.nav,
        article,
        showAdminUtils: !!req.blog?.user
    });
};
