/* globals describe, beforeEach, it */
"use strict";
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const it = lab.test;
const describe = lab.experiment;
const beforeEach = lab.before;

const chai = require("chai");
const sinon = require('sinon');
const chaiAsPromised = require("chai-as-promised");
const Request = require('../../lib/model/Request');

chai.use(chaiAsPromised);

const expect = chai.expect;
const proxyquire = require('proxyquire').noPreserveCache();

describe('handlers - send', () => {
    let handler;
    let client;

    let requestResolvedStack;
    let requestStack;


    beforeEach(done => {
        requestResolvedStack = [];
        requestStack = [];

        client = request => {
            requestStack.push(request);

            return Promise.resolve(requestResolvedStack.shift());
        };
        handler = proxyquire('../../lib/handlers/send', {
            '../client': client
        });
        
        done();
    });

    it('should create a client Request object for each given request', () => {
        const payload = [
            {
                uri: 'uri',
                method: 'method',
                payload: 'payload',
                queryString: 'queryString',
                headers: 'headers',
                form: 'form',
                json: 'json'
            },
            {
                uri: 'uri2',
                method: 'method2',
                payload: 'payload2',
                queryString: 'queryString2',
                headers: 'headers2',
                form: 'form2',
                json: 'json2'
            }
        ];
        requestResolvedStack.push('response1');
        requestResolvedStack.push('response2');

        return handler(new Request('plop', 'GET', payload))
            .then(responseList => {
                expect(responseList).to.deep.equal(['response1', 'response2']);
            });
    });
});
