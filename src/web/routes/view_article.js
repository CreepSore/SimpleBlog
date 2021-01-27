"use strict";
const MarkdownIt = require("markdown-it");
const { Article } = require("../../model/article");

/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 * @typedef {import("express").NextFunction} NextFunction
 */

module.exports = async(req, res, next) => {
    const article = await Article.findByPk(req.params.articleId);
    const mdRenderer = new MarkdownIt();
    const markdownRendered = mdRenderer.render(article.data);

    res.render("article_view", {
        nav: req.nav,
        article,
        showAdminUtils: !!req.blog?.user
    });
};
