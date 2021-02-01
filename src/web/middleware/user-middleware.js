"use strict";
const {User} = require("../../model/user");

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
    if(!req.session) {
        return next();
    }

    const uuid = req.session.uuid;
    if(uuid) {
        req.blog = {
            user: await User.findByPk(uuid)
        };
    }

    next();
};
