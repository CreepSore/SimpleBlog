"use strict";
const { Article } = require("../../model/article");
const { Tag } = require("../../model/tag");

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
    get: async(req, res, next) => {
        if(!req.blog?.user) {
            return res.redirect("/");
        }

        const tags = await Tag.findAll({order: [["name", "asc"]]});

        res.render("edit_article", {
            nav: req.nav,
            tags
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
            data: req.body.data,
            description: req.body.data
        });
        res.redirect(`/article/edit/${article.uuid}`);
    }
};
