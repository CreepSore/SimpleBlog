"use strict";

/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 * @typedef {import("express").NextFunction} NextFunction
 * @typedef {import("../../middleware/service-middleware").ServiceCollection} ServiceCollection
 */

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
module.exports = {
    /**
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    get: async(req, res, next) => {
        res.sendFile(await req.serviceCollection.imageService.getImagePathFromUuid(req.params.imageId));
    },
    /**
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    post: async(req, res, next) => {
        if(!req.blog?.user || !req.files?.image) {
            return res.json({success: false}).end();
        }

        const {redirect} = req.query;

        /** @type {ServiceCollection} */
        const serviceCollection = req.serviceCollection;
        const imageService = serviceCollection.imageService;
        const uuid = imageService.saveImage(req.files.image, req.body?.description);

        if(redirect) {
            res.redirect(redirect);
        }

        if(uuid) {
            res.json({success: true, uuid: uuid}).end();
        }
        else {
            res.json({success: false}).end();
        }
    }
}
