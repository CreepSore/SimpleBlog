"use strict";
const UserService = require("../../../service/user-service");

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
    const {username, password} = req.body;
    const loginUuid = await UserService.loginUser(username, password);

    if(loginUuid) req.session.uuid = loginUuid;

    res.json({success: !!loginUuid}).end();
};
