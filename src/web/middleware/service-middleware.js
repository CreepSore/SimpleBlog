"use strict";

/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 * @typedef {import("express").NextFunction} NextFunction
 */

/** 
 * @typedef {Object} ServiceCollection
 * @property {ImageService} imageService
 */

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @param {ServiceCollection} serviceCollection
 */
module.exports = async(req, res, next, serviceCollection) => {
    req.serviceCollection = serviceCollection;
    next();
};
