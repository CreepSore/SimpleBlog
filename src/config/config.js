"use strict";
const path = require("path");
const fs = require("fs");
const ConfigModel = require("./config-model");

module.exports = class ConfigHandler {
    constructor(cfgRoot, templateRoot) {
        this._cfgpath = path.join(cfgRoot, "config.json");
        this._templatepath = path.join(templateRoot, "config.template.json");
        this._config = null;
    }

    /**
     * @returns {ConfigModel}
     */
    getConfig() {
        if(this._config === null) {
            if(!this.configExists()) {
                return null;
            }
            try {
                this._config = JSON.parse(fs.readFileSync(this._cfgpath).toString());
            }
            catch (ex) {
                return null;
            }
        }

        return this._config;
    }

    /**
     * @description Checks if the config exists
     */
    configExists() {
        return fs.existsSync(this._cfgpath);
    }

    /**
     * @description Checks if the config-template exists
     */
    templateExists() {
        return fs.existsSync(this._templatepath);
    }

    /**
     * @description Exports a freshly generated config-template
     */
    exportTemplate() {
        if(this.templateExists()) {
            fs.unlinkSync(this._templatepath);
        }

        fs.writeFileSync(this._templatepath, JSON.stringify(new ConfigModel(), null, 4));
    }
}
