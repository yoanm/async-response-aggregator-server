"use strict";

const client = require('../client');
const logger = require('../logger');
const Request = require('../model/Request');

/**
 * @param {Request} request
 *
 * @returns {Promise<Response[]>}
 */
module.exports = request => {
    return new Promise(resolve => {
        const requestStack = [];

        request.getPayload().forEach(request => {
            const clientRequest = new Request(
                request.uri,
                request.method,
                request.payload,
                request.queryString,
                request.headers,
                request.json
            );
            requestStack.push(
                client(clientRequest)
                    .catch(error => {/* $lab:coverage:off$ */
                        logger.error(error.stack);
                        return Promise.reject(error);
                    })/* $lab:coverage:on$ */
            );
        });

        resolve(Promise.all(requestStack));
    });
};
