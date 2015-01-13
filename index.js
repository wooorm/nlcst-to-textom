'use strict';

/*
 * Constants.
 */

var has;

has = Object.prototype.hasOwnProperty;

/**
 * Transform a concrete syntax tree into a tree constructed
 * from a given object model.
 *
 * @param {Object} TextOM
 * @param {NLCSTNode} nlcst
 * @return {Node} From `nlcst` and `TextOM` constructed
 *   node.
 */
function nlcstToTextOM(TextOM, nlcst) {
    var index,
        node,
        children,
        nodes,
        data,
        attribute;

    node = new TextOM[nlcst.type]();

    if (has.call(nlcst, 'children')) {
        index = -1;
        children = nlcst.children;
        nodes = [];

        while (children[++index]) {
            nodes[index] = nlcstToTextOM(TextOM, children[index]);
        }

        node.appendAll(nodes);
    } else {
        node.fromString(nlcst.value);
    }

    if (has.call(nlcst, 'data')) {
        data = nlcst.data;

        for (attribute in data) {
            if (has.call(data, attribute)) {
                node.data[attribute] = data[attribute];
            }
        }
    }

    return node;
}

module.exports = nlcstToTextOM;
