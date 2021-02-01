"use strict";

module.exports = class Storage {
    static instance = new Storage();

    constructor() {
        this._values = {};
        this._subStorages = {};
    }

    /**
     * @param {String} key
     */
    get(key) {
        const splitted = key.split(".");
        if(splitted.length === 1) {
            return this._values[splitted[0]];
        }
        else {
            return this._subStorages[splitted[0]].get(splitted.slice(1).join("."));
        }
    }

    /**
     * @param {String} key,
     * @param {any} value
     */
    set(key, value) {
        const splitted = key.split(".");
        if(splitted.length === 1) {
            this._values[splitted[0]] = value;
        }
        else {
            if(!this._subStorages[splitted[0]]) {
                this._subStorages[splitted[0]] = new Storage(splitted[0]);
            }
            this._subStorages[splitted[0]].set(splitted.slice(1).join("."), value);
        }
    }
};
