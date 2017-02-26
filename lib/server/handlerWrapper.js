"use strict";

const logger = require('../logger/taskLogger')('Routing');
const transformers = require('./transformers');

module.exports = (name, handler) => (request, reply) => {
    const promise = new Promise(resolve => {
            request = transformers.in(request);

            logger.info(`[${name.toUpperCase()}][Request]`, {request});

            resolve(handler(request));
        })
            .then(response => {
                logger.info(`[${name.toUpperCase()}][Response]`, {response});

                return response;
            })
        ;

    return promise.then(response => {
        reply({result: transformers.out(response)}).type('application/json');
    })
        .catch(error => {
            // Reply with an error
            logger.error(error.stack);
            reply({error: error.message}).type('application/json').code(500);

            return Promise.resolve();
        })
    ;
};
