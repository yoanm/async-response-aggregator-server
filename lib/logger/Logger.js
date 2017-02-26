"use strict";

const wrapWinston = (winstonLogger, level, message, meta) => {
    const argList = [];

    argList.push(message);
    if (meta) {
        argList.push(meta);
    }
    winstonLogger[level].apply(winstonLogger, argList);
};

class Logger {
    /**
     *
     * @param {winston.Logger} logger
     */
    constructor(logger) {
        this.logger = logger;
    }

    /**
     * @public
     *
     * @param {string} message
     * @param {Object} meta
     */
    debug(message, meta = {}) {
        this.log('debug', message, meta);
    };

    /**
     * @public
     *
     * @param {string} message
     * @param {Object} meta
     */
    info(message, meta = {}) {
        this.log('info', message, meta);
    };

    /**
     * @public
     *
     * @param {string} message
     * @param {Object} meta
     */
    warning(message, meta = {}) {
        this.log('warn', message, meta);
    };

    /**
     * @public
     *
     * @param {string} message
     * @param {Object} meta
     */
    error(message, meta = {}) {
        this.log('error', message, meta);
    };

    /**
     * @protected
     * Could be overridden by child class
     *
     * @param {string} message
     * @param {Object} meta
     *
     * @returns {string}
     */
    normalizeMessage(message, meta = {}) {
        return message;
    }

    /**
     * @protected
     * Could be overridden by child class
     *
     * @param {Object} meta
     *
     * @returns {Object}
     */
    normalizeMeta(meta = {}) {
        return meta;
    }

    /**
     * @protected
     *
     * @param {string} level
     * @param {string} message
     * @param {Object} meta
     */
    log(level, message, meta = {}) {
        meta = this.normalizeMeta(meta);

        return wrapWinston(
            this.logger,
            level,
            this.normalizeMessage(message, meta),
            meta
        );
    }
}


module.exports = Logger;
