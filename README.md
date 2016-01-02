# iotdb-links
Code for dealing with [CoRE Link Format](https://tools.ietf.org/html/rfc6690) (RFC 6690) and similar

# Functions

## parse

Parse a Link Header

    var value = '<tcp://mqtt.iotdb.org:1883>; rel="mqtt"; payload=PUT; topic="bedroom/light"'
    var result = iotdb_link.parse(value);
    var expect = {
        'tcp://mqtt.iotdb.org:1883': {
            rel: 'mqtt',
            payload: 'PUT',
            topic: 'bedroom/light'
        }
    };

## produce

    var links = [ 
        {
            "url": "/djkd",
            "d":  { 
                "a": "1",
            },
        },
        {
            "url": "/b/c",
            "d":  { 
                "c": "1",
                "d": "2",
            },
        }
    ];
    var result = exports.produce(links, function(error, result)) {
    };

    exports.produce([
    ], function(error, result) {
        var expect = '</djkd>;a="1",</b/c>;c="1";d="2"';
    });
