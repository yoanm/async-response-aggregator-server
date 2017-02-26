"use strict";

const Joi = require('joi');
const handlers = require('../handlers');
const handlerWrapper = require('./handlerWrapper');
const models = require('./models');

module.exports = [
    {
        method: 'POST',
        handler: handlerWrapper('Send', handlers.send),
        path: '/send',
        config: {
            plugins: {
                'hapi-swagger': {
                    responses: {
                        200: {
                            description: 'Success',
                            schema: Joi.object({
                                result: Joi.array()
                                    .items(models.response),
                                error: Joi.object()
                            })
                                .without('result', ['error'])
                                .without('error', ['result'])
                        }
                    }
                }
            },
            tags: ['api'],
            validate: {
                payload: Joi.array()
                    .items(models.request)
                    .min(1)
                    .required()
            }
        }
    }
];
