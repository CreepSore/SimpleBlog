"use strict";

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
module.exports = {
    get: async(req, res, next) => {
        res.sendFile(await req.serviceCollection.imageService.getImagePathFromUuid(req.params.imageId));
    },
    post: async(req, res, next) => {
        // TODO: Image Upload-Logic
    }
}
