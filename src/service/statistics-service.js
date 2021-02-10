"use strict";

/**
 * @typedef {import("express").Request} Request
 */

module.exports = class StatisticsService {
    static ipToNumber(ip) {
        return ip.split(".")
            .map((x, i) => parseInt(x, 10) << 8*(3-i) >>> 0)
            .reduce((a, b) => a + b);
    }

    static numberToIp(num) {
        return [
            (num >> 24) & 0xFF,
            (num >> 16) & 0xFF,
            (num >> 8) & 0xFF,
            num & 0xFF
        ].join(".");
    }

    /**
     * @param {Request} req 
     */
    static getIpFromRequest(req) {
        return req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || req.socket.remoteAddress;
    }
};
