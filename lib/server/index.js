"use strict";

const config = require('config');
const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const taskLogger = require('../logger/taskLogger')('Server');
const pkg = require('../../package.json');
const routeList = require('./routes');

const server = new Hapi.Server();
const wrapper = {};
let serverStarted = false;

server.connection({
    host: config.server.host,
    port: config.server.port
});

/**
 * @returns {Promise<null|Error>}
 */
wrapper.start = () => {
    taskLogger.starting();

    routeList.forEach(route => {
        server.route(route);
    });

    const options = {
        info: {
            title: pkg.name,
            version: pkg.version
        }
    };

    return server.register([
        Inert,
        Vision,
        {
            register: HapiSwagger,
            options: options
        }]
    )
        .then(() => server.start())
        .then(() => {
            serverStarted = true;
            taskLogger.started();
            console.log(`Running at ${server.info.uri}`);
        })
        .catch(error => {
            taskLogger.error('Stopping after an error');
            return wrapper.stop()
                .then(() => {
                    return Promise.reject(error);
                })
            ;
        });
};

/**
 * @returns {Promise<null|Error>}
 */
wrapper.stop = () => {
    if (serverStarted === false) {
        return Promise.resolve(null);
    }
    taskLogger.stopping();

    return server.stop()
        .then(() => taskLogger.stopped())
        .then(() => null)
    ;
};

module.exports = wrapper;
