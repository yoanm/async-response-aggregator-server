"use strict";

const Response = require('../../model/Response');

/**
 * @param {Response} response
 *
 * @returns {Object}
 */
module.exports = response => {
    const format = object => {
        if (object instanceof Response) {
            return {
                body: object.getBody(),
                statusCode: object.getStatusCode(),
                headers: object.getHeaders()
            };
        }

        return object;
    };

    if (Array.isArray(response)) {
        return response.map(format);
    }

    return format(response);
};
