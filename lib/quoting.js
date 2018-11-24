/*
 *  lib/quoting.js
 *
 *  David Janes
 *  IOTDB.org
 *  2016-01-02
 *
 *  Copyright [2013-2016] [David P. Janes]
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

"use strict";

const _ = require('iotdb-helpers');

/**
 *  This needs to be cleaned up to deal with unicode
 *  characters and perhaps other edge cases
 */
const key = function (s) {
    if (s.match(/[^-A-Za-z0-9_]/g)) {
        throw new Error("bad key");
    }

    return s;
};

/**
 *  This needs to be cleaned up to deal with unicode
 *  characters and perhaps other edge cases
 */
const value = function (s) {
    if (!_.is.String(s)) {
        s = "" + s;
    }

    s = s.replace(/["\\]/g, "\\$&");
    if (s.match(/["; ]/g)) {
        return '"' + s + '"';
    } else {
        return s;
    }
};

/**
 *  This needs to be cleaned up to deal with unicode
 *  characters and perhaps other edge cases
 */
const url = function (s) {
    return s;
};

/**
 *  API
 */
exports.key = key;
exports.value = value;
exports.url = url;
