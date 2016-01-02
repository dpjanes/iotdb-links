# iotdb-links
Code for dealing with [CoRE Link Format](https://tools.ietf.org/html/rfc6690) (RFC 6690) and similar

<img src="https://raw.githubusercontent.com/dpjanes/iotdb-homestar/master/docs/HomeStar.png" align="right" />

## See also

* [RFC 5988](https://tools.ietf.org/html/rfc5988)
* [RFC 6690](https://tools.ietf.org/html/rfc6690)
* [HTTP LINK Element](http://www.w3.org/TR/html401/struct/links.html)

Although fully stand-alone, this module is part of the IOTDB project.
Find out more about this here [https://homestar.io/about](https://homestar.io/about].

## Notes

* quoting functions are probably not 100% compliant, especially with unicode. Please help.

# Functions

These are almost inverses of each other, except that 'parse()' can 
accept a wider range of values than 'produce()' will generate.

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

Produce a Link Header

    var linkd = {
        "/djkd" : {
            "a": "1",
        },
        "/b/c":  { 
            "c": "1",
            "d": "2",
        },
    };

    iotdb_link.produce(linkd, function(error, result) {
        var expect = '</djkd>;a="1",</b/c>;c="1";d="2"';
    });
