"use strict";
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const it = lab.test;
const describe = lab.experiment;
const beforeEach = lab.before;

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const Request = require('../../lib/model/Request');
const Response = require('../../lib/model/Response');

chai.use(chaiAsPromised);

const expect = chai.expect;
const proxyquire = require('proxyquire').noPreserveCache();

describe('client', () => {
    let client;
    let pkg;

    let requestOptionList;
    let requestPromise = {};
    let requestResolvedValue;
    let requestRejectedValue;

    beforeEach(done => {
        requestOptionList = [];
        requestResolvedValue = null;
        requestRejectedValue = null;
        pkg = {
            name: 'appName'
        };
        requestPromise = optionList => {
            requestOptionList = optionList;

            return requestRejectedValue === null
                ? Promise.resolve(requestResolvedValue)
                : Promise.reject(requestRejectedValue);
        };
        client = proxyquire('../../lib/client/index', {
            'request-promise-native': requestPromise,
            '../../package.json': pkg
        });

        done();
    });

    it('should be able to call an uri', () => {
        requestResolvedValue = {
            body: 'body',
            statusCode: 'statusCode',
            headers: 'headers'
        };
        return client(
            new Request('http://www.google.fr/webhp#q=github+api')
        );
    });

    it('should use Request instance to create client request', () => {
        const uri = 'uri';
        const method = 'method';
        const body = 'body';
        const qs = 'qs';
        const headers = {custom: 'headers'};
        const json = false;

        requestResolvedValue = {
            body: 'body',
            statusCode: 'statusCode',
            headers: 'headers'
        };

        return client(new Request(uri, method, body, qs, headers, json))
            .then(() => {
                expect(requestOptionList.uri).to.equal(uri, 'Bad uri !');
                expect(requestOptionList.method).to.equal(method, 'Bad method !');
                expect(requestOptionList.headers).to.contain(headers, 'Bad headers !');
                expect(requestOptionList.json).to.equal(json, 'Bad json !');
                expect(requestOptionList.body).to.equal(body, 'Bad body !');
                expect(requestOptionList.qs).to.equal(qs, 'Bad qs !');
            });
    });

    describe('default values', () => {
        it('should have default values', () => {
            const uri = 'uri';
            const method = 'method';
            const json = false;
            requestResolvedValue = {
                body: 'body',
                statusCode: 'statusCode',
                headers: 'headers'
            };

            return client(new Request(uri, method, {}, {}, {}, json))
                .then(() => {
                    expect(requestOptionList.headers).to.deep.equal({'User-Agent': pkg.name}, 'Bad headers !');
                    expect(requestOptionList.json).to.equal(json, 'Bad json !');
                    expect(requestOptionList.body).to.equal('', 'Bad body !');
                    expect(requestOptionList.qs).to.equal(null, 'Bad qs !');
                });
        });

        it('should have json default values', () => {
            const uri = 'uri';
            const method = 'method';
            const json = true;
            requestResolvedValue = {
                body: 'body',
                statusCode: 'statusCode',
                headers: 'headers'
            };

            return client(new Request(uri, method, {}, {}, {}, json))
                .then(() => {
                    expect(requestOptionList.body).to.deep.equal({}, 'Bad body !');
                    expect(requestOptionList.qs).to.deep.equal({}, 'Bad qs !');
                });
        });
    });

    describe('transform client response', () => {
        it('shoudl transform successful client response', () => {
            requestResolvedValue = {
                body: 'body',
                statusCode: 'statusCode',
                headers: 'headers'
            };

            return client(new Request('uri'))
                .then(response => {
                    expect(response).to.be.instanceOf(Response, 'Bad instance !');
                    expect(response.getBody()).to.equal(requestResolvedValue.body, 'Bad Body !');
                    expect(response.getStatusCode()).to.equal(requestResolvedValue.statusCode, 'Bad StatusCode !');
                    expect(response.getHeaders()).to.equal(requestResolvedValue.headers, 'Bad Headers !');
                });
        });
        describe('transform an on error client response', () => {
            it('should transform an on error plain text  client response', () => {
                requestRejectedValue = {
                    error: {
                        code: 'code'
                    },
                    message: 'message'
                };

                return client(new Request('uri', 'GET', {}, {}, {}, false))
                    .then(response => {
                        expect(response).to.be.instanceOf(Response, 'Bad instance !');
                        expect(response.getBody()).to.equal(
                            `${requestRejectedValue.error.code} ${requestRejectedValue.message}`,
                            'Bad Body !'
                        );
                    });
            });

            it('should transform an on error json client response', () => {
                requestRejectedValue = {
                    error: {
                        code: 'code'
                    },
                    message: 'message'
                };

                return client(new Request('uri', 'GET', {}, {}, {}, true))
                    .then(response => {
                        expect(response).to.be.instanceOf(Response, 'Bad instance');
                        expect(response.getBody()).to.deep.equal(
                            {
                                error: requestRejectedValue.error.code,
                                message: requestRejectedValue.message
                            },
                            'Bad body !'
                        );
                    });
            });
        });
    });
});
