/*
 *  produce.js
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

var _ = require('iotdb')._;

/**
 *  rfc6690 / CoAP CORE format producer
 *
 *  If 'producer' is a function, it will be called
 *  repeatedly, which will in turn callback with 
 *  a 'url' and a 'd'. When 'url' is null, it finishes
 *
 *  If 'producer' is an array, it should be an
 *  array of dictionaries, each dictionary containing
 *  an element 'url' and 'd'.
 *
 *  When the link(s) is/are produced, done will be
 *  called back with (error, link-string)
 *
 *  Note that there's a lot of work to be done on 
 *  this for unicode and weird IETF things
 */
var link_producer = function (producer, done) {
    if (_.is.Array(producer)) {
        var items = producer;
        var i = 0;

        producer = function (callback) {
            if (i >= items.length) {
                return callback(null, null);
            }

            var item = items[i++];
            callback(item.url, item.d);
        };
    }

    var _quote = function (s) {
        return s;
    };

    var result = [];

    var _produce = function () {
        producer(function (url, d) {
            if (!url) {
                return done(null, result.join(""));
            }

            if (result.length) {
                result.push(",");
            }

            result.push("<");
            result.push(_quote(url));
            result.push(">");

            if (!_.is.Empty(d)) {
                _.mapObject(d, function (value, key) {
                    result.push(";");
                    result.push(_quote(key));
                    result.push("=\"");
                    result.push(_quote(value));
                    result.push("\"");
                });
            }

            _produce();
        });
    };

    _produce();
};

/**
 *  API
 */
exports.produce = link_producer;
