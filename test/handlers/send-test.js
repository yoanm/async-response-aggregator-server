"use strict";
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const it = lab.test;
const describe = lab.experiment;
const beforeEach = lab.before;

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const Request = require('../../lib/model/Request');

chai.use(chaiAsPromised);

const expect = chai.expect;
const proxyquire = require('proxyquire').noPreserveCache();

describe('handlers - send', () => {
    let handler;
    let client;

    let requestResolvedStack;
    let requestOptionListStack;

    beforeEach(done => {
        requestResolvedStack = [];
        requestOptionListStack = [];

        client = request => {
            requestOptionListStack.push(request);

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
                json: 'json'
            },
            {
                uri: 'uri2',
                method: 'method2',
                payload: 'payload2',
                queryString: 'queryString2',
                headers: 'headers2',
                json: 'json2'
            }
        ];
        requestResolvedStack.push('response1');
        requestResolvedStack.push('response2');

        return handler(new Request('plop', 'GET', payload))
            .then(responseList => {
                expect(responseList).to.deep.equal(['response1', 'response2'], 'Bad response !');
                expect(requestOptionListStack.length).to.equal(2, 'Bad request option list count !');
                requestOptionListStack.forEach((requestOptionList, index) => {
                    expect(requestOptionList).to.deep.equal(
                        payload[index],
                        `Bad request option list for request #${index} !`
                    );
                });
            });
    });
});
