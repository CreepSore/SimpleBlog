"use strict";
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
            password: password
        };

        if(useEmail) {
            where = {
                email: username,
                password: password
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

};
