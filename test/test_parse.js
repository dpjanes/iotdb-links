/*
 *  test_parse.js
 *
 *  David Janes
 *  IOTDB
 *  2016-01-02
 */

"use strict";

const assert = require("assert")
const parse = require("../parse")
const _ = require("iotdb")._;

describe('test_parse', function() {
    describe('parse_link', function() {
        it('empty', function() {
            const value = "";
            const result = parse.parse(value);
            const expect = {};

            assert.deepEqual(expect, result);
        });
        it('simple', function() {
            const value = '<tcp://mqtt.iotdb.org:1883>';
            const result = parse.parse(value);
            const expect = { 'tcp://mqtt.iotdb.org:1883': {} };

            assert.deepEqual(expect, result);
        });
        it('simple with kinda malformed extension', function() {
            const value = '<tcp://mqtt.iotdb.org:1883>; ';
            const result = parse.parse(value);
            const expect = { 'tcp://mqtt.iotdb.org:1883': {} };

            assert.deepEqual(expect, result);
        });
        it('single', function() {
            const value = '<tcp://mqtt.iotdb.org:1883>; rel="mqtt"; payload=PUT; topic="bedroom/light"'
            const result = parse.parse(value);
            const expect = { 'tcp://mqtt.iotdb.org:1883': { rel: 'mqtt', payload: 'PUT', topic: 'bedroom/light' } };

            assert.deepEqual(expect, result);
        });
        it('multi', function() {
            const value = '<tcp://mqtt.iotdb.org:1883>; rel="mqtt"; payload=PUT; topic="bedroom/light",<ssl://mqtt.iotdb.org:1883>; rel="mqtt"; payload=PUT; topic="bedroom/light",'
            const result = parse.parse(value);
            const expect = { 'tcp://mqtt.iotdb.org:1883': { rel: 'mqtt', payload: 'PUT', topic: 'bedroom/light' },
  'ssl://mqtt.iotdb.org:1883': { rel: 'mqtt', payload: 'PUT', topic: 'bedroom/light' } }

            assert.deepEqual(expect, result);
        });
        it('bad', function() {
            const value = "http://www.google.com";
            const result = parse.parse(value);
            const expect = {};

            assert.deepEqual(expect, result);
        });
        it('quotes (https://github.com/dpjanes/iotdb-links/issues/1)', function() {
            const value = '</zcl> ;ep="nih:sha-256;bob";if=urn:zcl:v0;rt=urn:zcl'
            const result = parse.parse(value);
            const expect = {"/zcl":{"ep":"nih:sha-256;bob","if":"urn:zcl:v0","rt":"urn:zcl"}}

            assert.deepEqual(expect, result);
        });
    });
});
