"use strict";

const requestPromise = require('request-promise-native');
const logger = require('../logger/taskLogger')('Client');
const Response = require('../model/Response');
const pkg = require('../../package.json');

const defaultOptionList = {
    headers: {'User-Agent': pkg.name},
    json: true,
    simple: false,
    resolveWithFullResponse: true
};

/**
 * @param {Request} request
 *
 * @returns {Promise<Response|Error>}
 */
module.exports = request => {
    const optionList = Object.assign(
        {},
        defaultOptionList,
        {
            uri: request.getUri(),
            method: request.getMethod(),
            headers: Object.assign({}, defaultOptionList.headers, request.getHeaders()),
            json: request.isJson()
        }
    );

    if (request.getPayload() && Object.keys(request.getPayload()).length > 0) {
        optionList.body = request.getPayload();
    } else {
        optionList.body = optionList.json === true ? {} : '';
    }
    if (request.getQueryString() && Object.keys(request.getQueryString()).length > 0) {
        optionList.qs = request.getQueryString();
    } else {
        optionList.qs = optionList.json === true ? {} : null;
    }

    const transformResponseToResponseObject = response => {
        return new Response(
            response.body,
            response.statusCode,
            response.headers,
            request
        );
    };

    const transformErrorToResponseObject = error => {
        logger.debug('[Error] Conversion to Response.', {options: optionList});

        return Promise.resolve(new Response(
            optionList.json === true ? {
                error: error.error.code,
                message: error.message
            } : `${error.error.code} ${error.message}`,
            500,
            {},
            request
        ));
    };

    const logResponseObject = response => {
        logger.debug('[Reponse]', {response: response, options: optionList});

        return response;
    };

    logger.debug('[Request]', {options: optionList});

    const transform = requestPromise(optionList)
        .then(transformResponseToResponseObject, transformErrorToResponseObject);

    return transform
        .then(logResponseObject);
};
