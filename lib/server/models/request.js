"use strict";

const Joi = require('joi');

module.exports = Joi.object()
    .keys({
        uri: Joi.string()
            .uri({
                scheme: [/https?/]
            })
            .required(),
        method: Joi.string()
            .allow(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'])
            .default('GET'),
        payload: Joi.alternatives().try(Joi.object(), Joi.array(), Joi.string())
            .default(null),
        queryString: Joi.alternatives().try(Joi.object(), Joi.array(), Joi.string())
            .default(null),
        headers: Joi.object(),
        json: Joi.boolean()
            .default(true)
    })
    .example({
        method: 'GET',
        uri: 'http://url.com',
        payload: {},
        queryString: {},
        headers: {},
        json: true
    })
;
