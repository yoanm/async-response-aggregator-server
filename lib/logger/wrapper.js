"use strict";

const winston = require('winston');
const config = require('config');
const path = require('path');
const moment = require('moment');

const loggerConfig = config.logger;

const formatFile = options => {
    return ' [' + options.level.toUpperCase() + ']'
        + '[' + moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ']'
        + (options.message ? ' ' + options.message : '')
        + (
            options.meta && Object.keys(options.meta).length
                ? ' ' + JSON.stringify(options.meta)
                : ''
        )
    ;
};

const formatConsole = options => {
    return winston.config.colorize(options.level) + ':'
        + (options.message ? ' ' + options.message : '')
        + (
            options.meta && Object.keys(options.meta).length
                ? ' ' + winston.config.colorize('data', JSON.stringify(options.meta))
                : ''
        )
    ;
};

/**
 * @type {winston.Logger} Default logger wrapper for the whole app. Use console output and a log file
 */
module.exports = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: config.debug === true ? 'debug' : loggerConfig.level,
            name: 'console',
            json: false,
            colorize: true,
            formatter: formatConsole
        }),
        new winston.transports.File({
            name: 'default',
            level: config.debug === true ? 'debug' : loggerConfig.level,
            filename: path.resolve(loggerConfig.path, './server.log'),
            tailable: true,
            json: false,
            formatter: formatFile
        })
    ]
});
