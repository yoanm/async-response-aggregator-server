"use strict";

class Response {
    /**
     *
     * @param {string} body
     * @param {int}    statusCode
     * @param {Object} headers
     * @param {Object} request
     */
    constructor(
        body,
        statusCode = 200,
        headers = {},
        request = {}
    ) {
        this.body = body;
        this.statusCode = statusCode;
        this.headers = headers;
        this.request = request;
    }

    /**
     * @public
     * @returns {int}
     */
    getStatusCode() {
        return this.statusCode;
    }

    /**
     * @public
     * @returns {string}
     */
    getBody() {
        return this.body;
    }

    /**
     * @public
     * @returns {Object}
     */
    getHeaders() {
        return this.headers;
    }

    /**
     * @public
     * @returns {Object}
     */
    getRequest() {
        return this.request;
    }
}

module.exports = Response;
