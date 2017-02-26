"use strict";

const Request = require('../../model/Request');

/**
 * Will convert an HapiRequest to a Request object
 * @param {Object} request
 *
 * @returns {Request}
 */
module.exports = request => {
    return new Request(
        request.path,
        request.method,
        request.payload,
        request.paramsArray,
        request.headers,
        true
    );
};
