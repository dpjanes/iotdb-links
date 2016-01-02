/*
 *  test_produce.js
 *
 *  David Janes
 *  IOTDB
 *  2016-01-02
 */

"use strict";

var assert = require("assert")
var sleep = require("sleep");
var produce = require("../produce")
var _ = require("iotdb")._;

describe('test_produce', function() {
    describe('produce', function() {
        describe('arrays', function() {
            it('empty', function() {
                var expect = "";
                var value = {}
                produce.produce(value, function(error, result) {
                    assert.strictEqual(result, expect);
                });
            });
            it('simple', function() {
                var expect = '<tcp://mqtt.iotdb.org:1883>';
                var value = { 'tcp://mqtt.iotdb.org:1883': {} };

                produce.produce(value, function(error, result) {
                    assert.strictEqual(result, expect);
                });
            });
            it('single', function() {
                var expect = '<tcp://mqtt.iotdb.org:1883>;rel=mqtt;payload=PUT;topic=bedroom/light'
                var value = { 'tcp://mqtt.iotdb.org:1883': { rel: 'mqtt', payload: 'PUT', topic: 'bedroom/light' } };
                produce.produce(value, function(error, result) {
                    assert.strictEqual(result, expect);
                });
            });
            it('multi', function() {
                var expect = '<tcp://mqtt.iotdb.org:1883>;rel=mqtt;payload=PUT;topic=bedroom/light,<ssl://mqtt.iotdb.org:1883>;rel=mqtt;payload=PUT;topic=bedroom/light'

                var value = {
                    'tcp://mqtt.iotdb.org:1883': {
                        rel: 'mqtt',
                        payload: 'PUT',
                        topic: 'bedroom/light'
                    },
                    'ssl://mqtt.iotdb.org:1883': {
                        rel: 'mqtt',
                        payload: 'PUT',
                        topic: 'bedroom/light'
                    }
                };

                produce.produce(value, function(error, result) {
                    assert.strictEqual(result, expect);
                });
            });
            /*
            it('multi-line', function() {
                var expect = "";
                var result = produce.produce(expect);
                var value = {};

                console.log(result);
                // assert.strictEqual(result, value);
            });
            it('bad', function() {
                var expect = 124;
                var result = produce.produce(expect);
                var value = {};

                console.log(result);
                // assert.strictEqual(result, value);
            });
            */
            /*
            it('bad', function() {
                var expect = "http://www.google.com";
                var result = produce.produce(value);
                var value = {};

                assert.ok(_.is.Equal(result, value));
            });
            */
        });
    });
});
