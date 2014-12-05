'use strict';

/**
 * Dependencies.
 */

var nlcstToTextOM,
    TextOMConstructor,
    assert;

nlcstToTextOM = require('./');
TextOMConstructor = require('textom');
assert = require('assert');

/**
 * Constants.
 */

var TextOM;

TextOM = new TextOMConstructor();

/**
 * Fixtures.
 */

var types;

types = Object.keys(TextOM).filter(function (key) {
    return key.toUpperCase() !== key && key.indexOf('Node') > 0;
});

/**
 * Tests.
 */

describe('nlcstToTextOM(textom, nlcst)', function () {
    it('should be a `function`', function () {
        assert(typeof nlcstToTextOM === 'function');
    });

    it('should throw when `TextOM` is missing', function () {
        assert.throws(function () {
            nlcstToTextOM();
        });
    });

    it('should throw when `nlcst` is missing', function () {
        assert.throws(function () {
            nlcstToTextOM(TextOM);
        });
    });

    it('should return a node of `type`', function () {
        types.forEach(function (type) {
            if (TextOM[type].prototype.nodeName === 'Text') {
                assert(nlcstToTextOM(TextOM, {
                    'type': type,
                    'value': 'test'
                }).type === type);
            } else {
                assert(nlcstToTextOM(TextOM, {
                    'type': type,
                    'children': []
                }).type === type);
            }
        });
    });

    it('should append all children, if applicable', function () {
        types.forEach(function (type) {
            if (TextOM[type].prototype.nodeName === 'Text') {
                return;
            }

            assert(nlcstToTextOM(TextOM, {
                'type': type,
                'children': [
                    {
                        'type': 'Text',
                        'value': 'AT'
                    },
                    {
                        'type': 'Text',
                        'value': '&'
                    },
                    {
                        'type': 'Text',
                        'value': 'T'
                    }
                ]
            }).length === 3);
        });
    });

    it('should set a value, if applicable', function () {
        types.forEach(function (type) {
            if (TextOM[type].prototype.nodeName !== 'Text') {
                return;
            }

            assert(nlcstToTextOM(TextOM, {
                'type': type,
                'value': 'AT&T'
            }).internalValue === 'AT&T');
        });
    });

    it('should set data properties, if applicable', function () {
        var result;

        result = nlcstToTextOM(TextOM, {
            'type': 'TextNode',
            'value': 'nodes',
            'data': {
                'partOfSpeech': 'NN',
                'stem': 'node'
            }
        });

        assert(result.data.partOfSpeech === 'NN');
        assert(result.data.stem === 'node');
    });

    it('should NOT set inherited data properties', function () {
        var result;

        function Data() {}

        Data.prototype.test = 'test';

        result = nlcstToTextOM(TextOM, {
            'type': 'TextNode',
            'value': 'nodes',
            'data': new Data()
        });

        assert(!('test' in result.data));
    });
});
