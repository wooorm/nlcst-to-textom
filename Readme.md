# nlcst-to-textom [![Build Status](https://img.shields.io/travis/wooorm/nlcst-to-textom.svg?style=flat)](https://travis-ci.org/wooorm/nlcst-to-textom) [![Coverage Status](https://img.shields.io/coveralls/wooorm/nlcst-to-textom.svg?style=flat)](https://coveralls.io/r/wooorm/nlcst-to-textom?branch=master)

Transform an [NLCST](https://github.com/wooorm/nlcst) node into a [TextOM](https://github.com/wooorm/textom) node.

## Installation

npm:
```sh
$ npm install nlcst-to-textom
```

Component.js:
```sh
$ component install wooorm/nlcst-to-textom
```

Bower:
```sh
$ bower install nlcst-to-textom
```

## Usage

````js
var TextOMConstructor,
    nlcstToTextOM,
    inspect,
    TextOM;

TextOMConstructor = require('textom');
nlcstToTextOM = require('nlcst-to-textom');
inspect = require('retext-inspect').attach;

TextOM = new TextOMConstructor();

inspect({
  'TextOM' : TextOM
});

console.log(nlcstToTextOM(TextOM, {
  "type": "WordNode",
  "data": {
    "partOfSpeech": [
      "NNP",
      "NN"
    ]
  },
  "children": [
    {
      "type": "TextNode",
      "value": "AT"
    },
    {
      "type": "PunctuationNode",
      "children": [
        {
          "type": "TextNode",
          "value": "&"
        }
      ]
    },
    {
      "type": "TextNode",
      "value": "T"
    }
  ]
}));
/**
 * WordNode[3]
 * ├─ TextNode: 'AT'
 * ├─ PunctuationNode[1]
 * │  └─ TextNode: '&'
 * └─ TextNode: 'T'
 */
````

## Related

- [nlcst](https://github.com/wooorm/parse-nlcst)
- [parse-latin](https://github.com/wooorm/parse-latin)
- [parse-dutch](https://github.com/wooorm/parse-dutch)
- [parse-english](https://github.com/wooorm/parse-english)
- [retext](https://github.com/wooorm/retext)
- [textom](https://github.com/wooorm/textom)

## License

MIT © Titus Wormer
