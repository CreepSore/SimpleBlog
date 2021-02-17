"use strict";
const { Op } =  require("sequelize");
const { Article } = require("../../model/article");
const { Tag } = require("../../model/tag");

/**
 * 
 * @param {import("express").Request<{date: Date}>} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
module.exports = async(req, res, next) => {
    let where = {};
    const {date} = req.params;
    if(date) {
        let tomorrow = new Date(date.valueOf());
        tomorrow.setDate(tomorrow.getDate() + 1);
        where = {
            "createdAt": {
                [Op.gte]: date,
                [Op.lt]: tomorrow
            }
        }
    }

    const articles = await Article.findAll({
        order: [["updatedAt", "DESC"]],
        include: [Tag],
        where: where
    });

    res.render("article_index", {
        nav: req.nav,
        articles,
        showAdminUtils: !!req.blog?.user
    });
};
