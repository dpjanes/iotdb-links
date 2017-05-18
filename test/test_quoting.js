/*
 *  test_quoting.js
 *
 *  David Janes
 *  IOTDB
 *  2016-01-02
 */

"use strict";

var assert = require("assert")
var sleep = require("sleep");
var quoting = require("../quoting")
var _ = require("iotdb")._;

describe('test_quoting', function() {
    describe('url', function() {
        it('empty', function() {
            var value = "";
            var expect = "";
            var result = quoting.url(value);

            assert.strictEqual(expect, result);
        });
        it('standard', function() {
            var value = "http://www.google.com";
            var expect = "http://www.google.com";
            var result = quoting.url(value);

            assert.strictEqual(expect, result);
        });
    });
    describe('key', function() {
        it('empty', function() {
            var value = "";
            var expect = "";
            var result = quoting.key(value);

            assert.strictEqual(expect, result);
        });
        it('simple', function() {
            var value = "rel";
            var expect = "rel";
            var result = quoting.key(value);

            assert.strictEqual(expect, result);
        });
        it('complicated', function() {
            var value = "_MQTT-something-99";
            var expect = "_MQTT-something-99";
            var result = quoting.key(value);

            assert.strictEqual(expect, result);
        });
        it('bad 1', function() {
            var value = "MQTT something";
            assert.throws(function() {
                quoting.key(value);
            }, Error);
        });
        it('bad 2', function() {
            var value = "MQTT$something";
            assert.throws(function() {
                quoting.key(value);
            }, Error);
        });
    });
    describe('value', function() {
        it('empty', function() {
            var value = "";
            var expect = "";
            var result = quoting.value(value);

            assert.strictEqual(expect, result);
        });
        it('simple', function() {
            var value = "simple";
            var expect = "simple";
            var result = quoting.value(value);

            assert.strictEqual(expect, result);
        });
        it('spaces', function() {
            var value = "now is the time";
            var expect = '"now is the time"';
            var result = quoting.value(value);

            assert.strictEqual(expect, result);
        });
        it('quotes', function() {
            var value = '"now is the time"';
            var expect = '"\\"now is the time\\""';
            var result = quoting.value(value);

            assert.strictEqual(expect, result);
        });
        it('backslash', function() {
            var value = '"now is \\n the time"';
            var expect = '"\\"now is \\\\n the time\\""';
            var result = quoting.value(value);

            assert.strictEqual(expect, result);
        });
        it('semicolon', function() {
            var value = 'a;semicolon';
            var expect = '"a;semicolon"';
            var result = quoting.value(value);

            assert.strictEqual(expect, result);
        });
    });
});
