"use strict";

const Logger = require('./Logger');
const Response = require('../model/Response');
const Request = require('../model/Request');
const transformers = require('./transformers');

const normalize = (meta = {}, level = 0) => {
    if (level++ < 5) {
        if (Array.isArray(meta)) {
            return meta.map(metaData => normalize(metaData, level));
        } else if (meta instanceof Request) {
            return transformers.request(meta);
        } else if (meta instanceof Response) {
            return transformers.response(meta);
        } else if (meta instanceof Object) {
            const newObject = {};
            for (let metaKey in meta) {
                if (meta.hasOwnProperty(metaKey)) {
                    newObject[metaKey] = normalize(meta[metaKey], level);
                }
            }

            return newObject;
        }
    }

    return meta;
};

class EnhancedLogger extends Logger {
    /**
     * @public
     * @param {Object} request
     *
     * @returns {Object}
     */
    formatRequest(request) {
        return {
            url: request.url,
            query: request.query,
            path: request.path,
            method: request.method,
            mime: request.mime,
            params: request.paramsArray,
            payload: request.payload
        };
    }

    /**
     * @inheritDoc
     */
    normalizeMeta(meta = {}) {
        return normalize(meta);
    }

}

/**
 * @return {TaskLogger} Logger for a task
 */
module.exports = EnhancedLogger;

