async-response-aggregator-server
================================

A lightweight server to aggregate response from async requests

[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/yoanm/async-response-aggregator-server/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/yoanm/async-response-aggregator-server/?branch=master) [![Code Coverage](https://scrutinizer-ci.com/g/yoanm/async-response-aggregator-server/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/yoanm/async-response-aggregator-server/?branch=master) [![Build Status](https://scrutinizer-ci.com/g/yoanm/async-response-aggregator-server/badges/build.png?b=master)](https://scrutinizer-ci.com/g/yoanm/async-response-aggregator-server/build-status/master)

[![Travis Build Status](https://img.shields.io/travis/yoanm/async-response-aggregator-server/master.svg?label=travis)](https://travis-ci.org/yoanm/async-response-aggregator-server) [![Node Versions](https://img.shields.io/badge/node-6-8892BF.svg)](https://nodejs.org)

[![npm](https://img.shields.io/npm/v/async-response-aggregator-server.svg)](https://www.npmjs.com/package/async-response-aggregator-server) [![license](https://img.shields.io/npm/l/async-response-aggregator-server.svg)](https://www.npmjs.com/package/async-response-aggregator-server)


# Install
```bash
$ git clone https://github.com/yoanm/async-response-aggregator-server.git
$ cd async-response-aggregator-server
$ yarn install
```

# Usage

## Server
```bash
# Switch to right node version
$ nvm use
# Start server
$ NODE_ENV=prod npm start
Running at http://localhost:8000

```

## Documentation
Swagger documentation is available at `/documentation`

## Body example

 * `GET` request with query string (`a=b&c[0]=1`) and custom headers (`{"plop": true}`) :  
```json
{
    "method": "GET",
    "uri": "http://uri",
    "headers": {
        "plop": true
    },
    "queryString": "a=b&c[0]=1",
    "json": false
}
```
 * `POST` request with payload (`{"property": "value"}`) (response will be parsed as json) 
```json
{
    "method": "POST",
    "uri": "http://uri",
    "payload": {
        "property": "value"
    }
}
```
 * `GET` request with query string (`a=b&c[0]=1`) and custom headers (`{"plop": true}`) : 
```json
{
        "method": "GET",
        "uri": "http://uri",
        "headers": {
            "plop": true
        },
        "queryString": {
            "a": "b",
            "c": [
                1
            ]
        },
        "json": false
    }
]
```

### Uri
Endpoint URI

Required: true
Type: String
Allowed schemes: `http`, `https`

### Method
Method to use

Required: false
Type: String
Allowed Values: `GET`, `POST`, `PUT`, `DELETE`, `PATCH`
Default Value: `GET`

### Payload
Payload to send (for `POST` request for instance)

Required: false
Type: `object`, `array`, `string`
Default value: `null`

### QueryString
Query string to send (for `GET` request for instance)
Required: false
Type: `object`, `array`, `string`
Default value: `null`

### Headers
Header to use

Required: false
Type: `object`

### Json
Whether to parse response as JSON

Required: false
Type: `boolean`
Default value: `true`
