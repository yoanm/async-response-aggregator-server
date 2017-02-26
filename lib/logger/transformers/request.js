"use strict";

/**
 * @public
 * @param {Request} request
 *
 * @returns {Object}
 */
module.exports = request => {
    return {
        uri: request.getUri(),
        payload: request.getPayload(),
        queryString: request.getQueryString(),
        headers: request.getHeaders(),
        method: request.getMethod(),
        json: request.isJson()
    };
};
