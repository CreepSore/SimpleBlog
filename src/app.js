"use strict";

const ApplicationLoader = require("./application-loader");

const main = function() {
    try {
        const application = new ApplicationLoader();
        application.start();
    }
    catch (err) {
        console.error(err);
    }
};

main();
