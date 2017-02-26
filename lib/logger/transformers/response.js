"use strict";

const requestFormatter = require('./request');
const Request = require('../../model/Request');

/**
 * @public
 * @param {Response} response
 *
 * @returns {Object}
 */
module.exports = response => {
    let body = response.getBody();
    if (typeof body === 'string') {
        const extra = body.length > 100
            ? ' ...'
            : '';
        const userFriendlyBody = body.slice(0, 100);
        body = `${userFriendlyBody}${extra}`;
    }

    return {
        body: body,
        statusCode: response.getStatusCode(),
        headers: response.getHeaders(),
        request: response.getRequest() instanceof Request
            ? requestFormatter(response.getRequest())
            : response.getRequest()
    };
};
