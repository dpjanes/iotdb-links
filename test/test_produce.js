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
            it('semicolon', function() {
               var expect = '</a>;ep="ni:///sha-256;abc"';
               
               var value = {
                   '/a': {
                       ep: 'ni:///sha-256;abc'
                   }
               };

               produce.produce(value, function(error, result) {
                   assert.strictEqual(result, expect);
               });
            });
            it('producer', function() {
                var values = [
                    [ 'tcp://mqtt.iotdb.org:1883', {
                        rel: 'mqtt',
                        payload: 'PUT',
                        topic: 'bedroom/light'
                    }, ],
                    [ 'ssl://mqtt.iotdb.org:1883', {
                        rel: 'mqtt',
                        payload: 'PUT',
                        topic: 'bedroom/light'
                    }, ],
                ];
                var vi = 0;
                var _producer = function(callback) {
                    if (vi >= values.length) {
                        callback(null, null);
                    } else {
                        var vs = values[vi++];
                        callback(vs[0], vs[1]);
                    }
                };

                var expect = '<tcp://mqtt.iotdb.org:1883>;rel=mqtt;payload=PUT;topic=bedroom/light,<ssl://mqtt.iotdb.org:1883>;rel=mqtt;payload=PUT;topic=bedroom/light'
                produce.produce(_producer, function(error, result) {
                    assert.strictEqual(result, expect);
                });
            });
        });
    });
});
