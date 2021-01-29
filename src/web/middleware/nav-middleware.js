"use strict";
const {User} = require("../../model/user");

/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 * @typedef {import("express").NextFunction} NextFunction
 */

/**
 * @typedef {Object} NavEntry
 * @property {String} href
 * @property {String} text
 */

 /**
 * @typedef {Object} NavList
 * @property {String} brand
 * @property {Array<NavEntry>} list
 */

/**
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
module.exports = async(req, res, next) => {
    /** @type {NavList} */
    const nav = {
        brand: "Ehdes.com",
        list: [
            {
                href: "/article/index",
                text: "Article overview"
            }
        ]
    };

    if(req.blog?.user) {
        nav.list.push({
            href: "/article/new",
            text: "New Article"
        });
    }
    else {
        nav.list.push({
            href: "/login",
            text: "Login"
        });
    }

    nav.list.forEach(navEntry => {
        navEntry.active = navEntry.href === req.url;
    });

    req.nav = nav;
    next();
};
