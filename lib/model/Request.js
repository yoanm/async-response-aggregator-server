"use strict";

class Request {
    /**
     * @param {string}  uri
     * @param {string}  method
     * @param {Object}  payload
     * @param {Object}  queryString
     * @param {Object}  headers
     * @param {Object}  form
     * @param {boolean} json
     */
    constructor(uri, method = 'GET', payload = {}, queryString = {}, headers = {}, form = {}, json = true) {
        this.uri = uri;
        this.method = method;
        this.payload = payload;
        this.queryString = queryString;
        this.headers = headers;
        this.form = form;
        this.json = json;
    }

    /**
     * @public
     * @returns {string}
     */
    getUri() {
        return this.uri;
    }

    /**
     * @public
     * @returns {Object}
     */
    getPayload() {
        return this.payload;
    }

    /**
     * @public
     * @returns {Object}
     */
    getQueryString() {
        return this.queryString;
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
     * @returns {string}
     */
    getMethod() {
        return this.method;
    }

    /**
     * @public
     * @returns {Object}
     */
    getForm() {
        return this.form;
    }

    /**
     * @public
     * @returns {boolean}
     */
    isJson() {
        return this.json;
    }
}

module.exports = Request;
