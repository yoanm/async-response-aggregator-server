"use strict";

const Joi = require('joi');

module.exports = Joi.object()
    .keys({
        method: Joi.string()
            .allow(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'])
            .default('GET'),
        uri: Joi.string()
            .uri({
                scheme: [/https?/]
            })
            .required(),
        payload: Joi.when('json', {
            is: true,
            then: Joi.alternatives().try(Joi.object(), Joi.array()),
            otherwise: Joi.string()
        }),
        queryString: Joi.object(),
        headers: Joi.object(),
        form: Joi.alternatives().try(Joi.object(), Joi.array()),
        json: Joi.boolean()
            .default(true)
    })
    .example({
        method: 'GET',
        uri: 'http://url.com',
        payload: {},
        queryString: {},
        headers: {},
        form: {},
        json: true
    })
;
