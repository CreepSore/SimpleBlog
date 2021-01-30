"use strict";
const fs = require("fs");
const path = require("path");
const {Image} = require("../model/image");
const uuid = require("uuid");

/**
 * @typedef {import("express-fileupload").UploadedFile} File
 */

module.exports = class ImageService {
    constructor(imageRoot) {
        this._imageRoot = imageRoot;
    }

    async getImageFromUuid(uuid) {
        const image = await Image.findByPk(uuid);
        const finalPath = path.join(this._imageRoot, image.relativePath);
        if(fs.existsSync(finalPath)) {
            return fs.readFileSync(finalPath);
        }
        await image.destroy();
        return null;
    }

    async getImagePathFromUuid(uuid) {
        const image = await Image.findByPk(uuid);
        return path.join(this._imageRoot, image.relativePath);
    }

    /**
     * @param {File} uploadedFile
     */
    async saveImage(uploadedFile, description = "") {
        try {
            const imageId = uuid.v4();
            const ext = uploadedFile.name.split(".").slice(1).join(".");
            const relativePath = `${imageId}.${ext}`;
            await uploadedFile.mv(path.join(this._imageRoot, relativePath));
            const insertedImage = await Image.create({
                uuid: imageId,
                relativePath,
                description
            });
            return insertedImage;
        }
        catch {
            return false;
        }
    }
}
