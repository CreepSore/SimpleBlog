"use strict";
const fs = require("fs");
const path = require("path");
const {Image} = require("../model/image");

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
        return null;
    }

    async getImagePathFromUuid(uuid) {
        return path.join(this._imageRoot, await Image.findByPk(uuid).relativePath);
    }
}
