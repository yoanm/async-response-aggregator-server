"use strict";

const wrapper = require('./wrapper');
const BaseLogger = require('./EnhancedLogger');

class TaskLogger extends BaseLogger {

    constructor(taskName, wrapper) {
        super(wrapper);

        this.taskName = taskName;
    }

    starting() {
        this.info(' Starting ...');
    }

    stopping() {
        this.info(' Stopping ...');
    }

    started() {
        this.info(' Started');
    }

    stopped() {
        this.info(' Stopped');
    }

    /**
     * @inheritDoc
     */
    normalizeMessage(message, meta = {}) {
        return `[${this.taskName}]${message}`;
    }
}

/**
 * @return {TaskLogger} Logger for a task
 */
module.exports = taskName => new TaskLogger(taskName, wrapper);

