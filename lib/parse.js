/*
 *  lib/parse.js
 *
 *  David Janes
 *  IOTDB.org
 *  2014-07-17
 *
 *  Parse HTTP Link: value. Not quite finished, but
 *  good enough for show business.
 *
 *  See:
 *  http://tools.ietf.org/html/rfc5988
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

"use strict"

const _see_link = text => {
    const match = text.match(/^\s*<([^>]*)>/);
    if (match) {
        return {
            url: match[1],
            link: text.substring(match[0].length)
        };
    }
};

const _see_semicolon = text => {
    const match = text.match(/^\s*;/);
    if (match) {
        return {
            link: text.substring(match[0].length)
        };
    }
};

const _see_comma = text => {
    const match = text.match(/^\s*,/);
    if (match) {
        return {
            link: text.substring(match[0].length)
        };
    }
};

// XXX - missing \" handling
const _see_extension = text => {
    const match = text.match(/^\s*([^=\s]*)\s*=\s*"([^"]*)"/) || text.match(/^\s*([^=\s]*)\s*=\s*([^,;]*)/);
    if (match) {
        return {
            name: match[1],
            value: match[2],
            link: text.substring(match[0].length)
        };
    }

};

const parse_link = function (link) {
    const rdd = {};
    let d;

    while (link.length > 0) {
        // link
        d = _see_link(link);
        if (!d) {
            break;
        } else {
            link = d.link;
        }


        const rd = {};
        rdd[d.url] = rd;

        while (true) {
            d = _see_semicolon(link);
            if (!d) {
                break;
            } else {
                link = d.link;
            }

            d = _see_extension(link);
            if (!d) {
                break;
            } else {
                link = d.link;
            }

            rd[d.name] = d.value;
        }

        d = _see_comma(link);
        if (!d) {
            break;
        } else {
            link = d.link;
        }
    }

    return rdd;
};

/**
 *  API
 */
exports.parse = parse_link;
