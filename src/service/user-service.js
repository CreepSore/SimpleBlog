"use strict";
const crypto = require("crypto");
const {User} = require("../model/user");

module.exports = class UserService {
    /**
     * Tries to find an user which matches the username or password
     * @param {String} username username or email of the user
     * @param {String} password
     * @param {Boolean} useEmail specifies if username should be treated as email
     * @returns {String|false}
     */
    static async loginUser(username, password, useEmail = false) {
        let where = {
            username: username,
            password: crypto.createHash("SHA256").update(password).digest().toString("hex")
        };

        if(useEmail) {
            where = {
                email: username,
                password: crypto.createHash("SHA256").update(password).digest().toString("hex")
            };
        }

        const foundUser = await User.findOne({
            where: where
        });

        if(foundUser) {
            return foundUser.uuid;
        }

        return false;
    }

    /**
     * @param {String} username
     * @param {String} password
     * @param {String} email
     * @returns {String|false}
     */
    static async registerUser(username, password, email = null) {
        try {
            const user = await User.create({
                username: username,
                email: email,
                password: password
            });
            return user.uuid;
        }
        catch (err) {
            return false;
        }
    }
};
