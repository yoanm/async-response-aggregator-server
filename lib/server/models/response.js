"use strict";

const Joi = require('joi');

module.exports = Joi.object()
    .keys({
        body: Joi.alternatives().try(Joi.object(), Joi.string()),
        statusCode: Joi.number().integer(),
        headers: Joi.object()
    })
;
