'use strict';

import * as bst from '../binarySearchTree.js';

describe('binarySearchTree', function() {
    describe('node()', function() {
        it('no left or right provided: ', function() {
            chai.expect(bst.node(1, 1)).eql({k: 1, v: 1, l: null, r: null});
        });
        it('left provided but not right: ', function() {
            chai.expect(bst.node(
                2,
                2,
                bst.node(1, 1)
            )).eql({
                k: 2,
                v: 2,
                l: {k: 1, v: 1, l: null, r: null},
                r: null
            });
        });
        it('right provided but not left: ', function() {
            chai.expect(bst.node(
                2,
                2,
                null,
                bst.node(3, 3)
            )).eql({
                k: 2,
                v: 2,
                l: null,
                r: {k: 3, v: 3, l: null, r: null}
            });
        });
    });
    describe('insert()', function() {
        let tree1 = {};
        beforeEach(function() {
            // tree should never be mutated, but a test checks that
            // reset value to ensure all use same data
            tree1 = {
                k: 5,
                v: 5,
                l: {k: 2, v: 2, l: null, r: null},
                r: {k: 8, v: 8, l: null, r: null}
            };
        });
        it('inserted node < all nodes: ', function() {
            chai.expect(bst.insert(1, 1, tree1)).eql({
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
            chai.expect(bst.insert(10, 10, tree1)).eql({
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
            chai.expect(bst.insert(3, 3, tree1)).eql({
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
            chai.expect(bst.insert(7, 7, tree1)).eql({
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
            chai.expect(bst.insert(8, 7, tree1)).eql({
                k: 5,
                v: 5,
                l: {k: 2, v: 2, l: null, r: null},
                r: {k: 8, v: 7, l: null, r: null}
            });
        });
        it('inserted key exists, keeps children intact: ', function() {
            chai.expect(bst.insert(5, 4, tree1)).eql({
                k: 5,
                v: 4,
                l: {k: 2, v: 2, l: null, r: null},
                r: {k: 8, v: 8, l: null, r: null}
            });
        });
        it('does not mutate original tree: ', function() {
            const newTree = bst.insert(1, 1, tree1);
            chai.expect(newTree).not.eql(tree1);
            chai.expect(tree1).eql({
                k: 5,
                v: 5,
                l: {k: 2, v: 2, l: null, r: null},
                r: {k: 8, v: 8, l: null, r: null}
            });
            chai.expect(newTree).eql({
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
    });
});
