'use strict';

import * as bst from '../binarySearchTree.js';

const tree1 = {
    k: 5,
    v: 5,
    l: {k: 2, v: 2, l: null, r: null},
    r: {k: 8, v: 8, l: null, r: null}
};

describe('binarySearchTree', function() {
    describe('node()', function() {
        it('returns correct object: ', function() {
            chai.expect(bst.node(1, 1)).eql({k: 1, v: 1, l: null, r: null});
        });
    });
    describe('insert()', function() {
        it('inserted node < all nodes: ', function() {
            chai.expect(bst.insert(bst.node(1, 1), tree1)).eql({
                k: 5,
                v: 5,
                l: {
                    k: 2,
                    v: 2,
                    l: {k: 1, v:1, l: null, r: null},
                    r: null
                },
                r: {k: 8, v: 8, l: null, r: null}
            });
        });
        it('inserted node > all nodes: ', function() {
            chai.expect(bst.insert(bst.node(10, 10), tree1)).eql({
                k: 5,
                v: 5,
                l: {k: 2, v: 2, l: null, r: null},
                r: {
                    k: 8,
                    v: 8,
                    l: null,
                    r: {k: 10, v:10, l: null, r: null}
                }
            });
        });
        it('L node < inserted node < root node: ', function() {
            chai.expect(bst.insert(bst.node(3, 3), tree1)).eql({
                k: 5,
                v: 5,
                l: {
                    k: 2,
                    v: 2,
                    l: null,
                    r: {k: 3, v: 3, l: null, r: null}
                },
                r: {k: 8, v: 8, l: null, r: null}
            });
        });
        it('root node < inserted node < R node: ', function() {
            chai.expect(bst.insert(bst.node(7, 7), tree1)).eql({
                k: 5,
                v: 5,
                l: {k: 2, v: 2, l: null, r: null},
                r: {
                    k: 8,
                    v: 8,
                    l: {k: 7, v: 7, l: null, r: null},
                    r: null
                }
            });
        });
        it('inserted key already exists: ', function() {
            chai.expect(bst.insert(bst.node(8, 7), tree1)).eql(tree1);
        });
    });
});
