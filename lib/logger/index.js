"use strict";

const wrapper = require('./wrapper');
const Logger = require('./EnhancedLogger');

/**
 * @type {Logger} Default logger for the app
 */
module.exports = new Logger(wrapper);
