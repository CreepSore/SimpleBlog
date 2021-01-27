"use strict";
const { Article } = require("../../model/article");

/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 * @typedef {import("express").NextFunction} NextFunction
 */

module.exports = {
    /**
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @param {ServiceCollection} serviceCollection
     */
    get: (req, res, next) => {
        if(!req.blog?.user) {
            return res.redirect("/");
        }

        res.render("edit_article", {
            nav: req.nav
        });
    },
    /**
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @param {ServiceCollection} serviceCollection
     */
    post: async(req, res, next) => {
        if(!req.blog?.user) {
            return res.redirect("/");
        }
        
        const article = await Article.create({
            title: req.body.title,
            data: req.body.data
        });
        res.redirect(`/article/edit/${article.uuid}`);
    }
};
