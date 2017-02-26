"use strict";

if (['dev', 'prod'].indexOf(process.env.NODE_ENV)) {
    console.warn(`Undefined node environment "${process.env.NODE_ENV}", fallback to dev !`);
    process.env.NODE_ENV = 'dev';
}

const ON_DEATH = require('death')({
    SIGTERM: false,
    SIGQUIT: false
});

const logger = require('./lib/logger');
const taskLoggerFactory = require('./lib/logger/taskLogger');
const server = require('./lib/server');
const pkg = require('./package.json');
const NestedError = require('nested-error-stacks');

const appName = pkg.name;
const taskLogger = taskLoggerFactory(appName);

ON_DEATH((signal, err) => {
    let exitCode = 0;
    if (signal === 'SIGTERM' || signal === 'SIGQUIT') {
        exitCode = 1;
    }

    console.log('ON_DEATH');

    cleanAndExit(exitCode);
});

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);

    return cleanAndExit(1);
});


const cleanAndExit = (exitCode = 0) => {
    taskLogger.stopping();
    const _exit = error => {
        if (error instanceof Error) {
            console.error(error);
        }
        taskLogger.stopped();
        process.exit(exitCode);
    };

    return server.stop()
        .then(_exit, _exit);
};

taskLogger.starting();

return server.start()
    .then(() => taskLogger.started())
    .catch(error => {
        const newError = new NestedError(`Exit ${appName} after an error at initialisation`, error);
        logger.error(error.stack);

        return Promise.reject(cleanAndExit(1));
    });
