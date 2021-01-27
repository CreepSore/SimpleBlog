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
    get: async(req, res, next) => {
        if(!req.blog?.user) {
            return res.redirect("/");
        }

        const article = await Article.findByPk(req.params.articleId);
        if(!article) {
            return res.redirect("/");
        }
        res.render("edit_article", {
            article,
            nav: req.nav,
            showPreview: true
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
        
        if(req.body.save !== undefined) {
            const article = await Article.findByPk(req.body.uuid);
            await article.update({
                title: req.body.title,
                data: req.body.data
            }, {
                where: {uuid: req.body.uuid}
            });
            return res.redirect(`/article/edit/${article.uuid}`);
        }

        if(req.body.delete !== undefined) {
            await Article.destroy({
                where: {uuid: req.body.uuid}
            });
            return res.redirect(`/`);
        }
        res.redirect(`/`);
    }
};