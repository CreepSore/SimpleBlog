"use strict";
const {Sequelize, Op} = require("sequelize");
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
 */
module.exports = async(req, res, next) => {
    const articles = await Article.findAll({
        order: [["createdAt", "desc"]],
        limit: 10
    });

    const startDate = new Date(new Date().setDate(1));
    let articleCount = {};
    let relevantArticles = await Article.findAll({
        attributes: ["createdAt"],
        raw: true
    });
    for(let i = 0; i < 7*6; i++) {
        let date = new Date(startDate.valueOf());
        date.setDate(date.getDate() + i);
        date = new Date(date.valueOf());
        articleCount[date.toDateString()] = relevantArticles.filter(x => x.createdAt.toDateString() === date.toDateString()).length;
    }

    res.render("frontpage", {
        user: req.blog?.user,
        nav: req.nav,
        articles,
        startDate,
        /**
         * @param {Date} startDate
         * @param {Date} date
         * @param {Number} index
         * @returns {{class: Array<String>, href: String}}
         */
        dateFormatter: (startDate, date, index) => {
            let href = articleCount[date.toDateString()] > 0 ? `/articles/index/date/${date.toISOString().substring(0, 10)}` : "";
            let classPrefix = href ? "link" : "text";
            return {
                class: [
                    new Date().toDateString() === date.toDateString() ? `${classPrefix}-success` : "",
                    date?.getMonth() === startDate?.getMonth() ? `${classPrefix}-primary` : `${classPrefix}-secondary`
                ],
                href: href
            };
        }
    });
};
