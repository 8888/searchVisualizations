'use strict';

import * as bst from '../search/binarySearchTree.js';

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

    describe('findMin()', function() {
        /*
        [1, 2, 3, 4, 5, 6]
             3
           /   \
          1     5
           \   / \
            2 4   6
        */
        const tree1 = {
            k: 3,
            v: 3,
            l: {
                k: 1,
                v: 1,
                l: null,
                r: {k: 2, v: 2, l: null, r: null}
            },
            r: {
                k: 5,
                v: 5,
                l: {k: 4, v: 4, l: null, r: null},
                r: {k: 6, v: 6, l: null, r: null}
            }
        };
        it('min is deepest: ', function() {
            chai.expect(bst.findMin(tree1.r)).eql({k: 4, v: 4, l: null, r: null});
        });
        it('min is not deepest: ', function() {
            chai.expect(bst.findMin(tree1)).eql({
                k: 1,
                v: 1,
                l: null,
                r: {k: 2, v: 2, l: null, r: null}
            });
        });
    });

    describe('findMax()', function() {
        /*
        [1, 2, 3, 4, 5,]
             3
           /   \
          1     5
         / \   /
        0   2 4
        */
        const tree1 = {
            k: 3,
            v: 3,
            l: {
                k: 1,
                v: 1,
                l: {k: 0, v: 0, l: null, r: null},
                r: {k: 2, v: 2, l: null, r: null}
            },
            r: {
                k: 5,
                v: 5,
                l: {k: 4, v: 4, l: null, r: null},
                r: null
            }
        };
        it('max is deepest: ', function() {
            chai.expect(bst.findMax(tree1.l)).eql({k: 2, v: 2, l: null, r: null});
        });
        it('max is not deepest: ', function() {
            chai.expect(bst.findMax(tree1)).eql({
                k: 5,
                v: 5,
                l: {k: 4, v: 4, l: null, r: null},
                r: null
            });
        });
    });

    describe('remove()', function() {
        /*
        [0, 1, 2, 3, 4, 5]
             3
           /   \
          1     5
         / \   /
        0   2 4
        */
        const tree1 = {
            k: 3,
            v: 3,
            l: {
                k: 1,
                v: 1,
                l: {k: 0, v: 0, l: null, r: null},
                r: {k: 2, v: 2, l: null, r: null}
            },
            r: {
                k: 5,
                v: 5,
                l: {k: 4, v: 4, l: null, r: null},
                r: null
            }
        };
        /*
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
                   7
                 /   \
               /       \
             3           11
           /   \       /    \
          1     5     9     13
         / \   / \   / \   /  \
        0   2 4   6 8  10 12  14
        */
        const tree2 = {
            k: 7,
            v: 7,
            l: {
                k: 3,
                v: 3,
                l: {
                    k: 1,
                    v: 1,
                    l: {k: 0, v: 0, l: null, r: null},
                    r: {k: 2, v: 2, l: null, r: null}
                },
                r: {
                    k: 5,
                    v: 5,
                    l: {k: 4, v: 4, l: null, r: null},
                    r: {k: 6, v: 6, l: null, r: null}
                }
            },
            r: {
                k: 11,
                v: 11,
                l: {
                    k: 9,
                    v: 9,
                    l: {k: 8, v: 8, l: null, r: null},
                    r: {k: 10, v: 10, l: null, r: null}
                },
                r: {
                    k: 13,
                    v: 13,
                    l: {k: 12, v: 12, l: null, r: null},
                    r: {k: 14, v: 14, l: null, r: null}
                }
            }
        };
        /*
                   7
                 /
               /
             3
           /   \
          1     5
         /       \
        0         6
        */
        const tree3 = {
            k: 7,
            v: 7,
            l: {
                k: 3,
                v: 3,
                l: {
                    k: 1,
                    v: 1,
                    l: {k: 0, v: 0, l: null, r: null},
                    r: null
                },
                r: {
                    k: 5,
                    v: 5,
                    l: null,
                    r: {k: 6, v: 6, l: null, r: null}
                }
            },
            r: null
        };
        it('remove a node with no children: ', function() {
            chai.expect(bst.remove(2, tree1, true)).eql({
                k: 3,
                v: 3,
                l: {
                    k: 1,
                    v: 1,
                    l: {k: 0, v: 0, l: null, r: null},
                    r: null
                },
                r: {
                    k: 5,
                    v: 5,
                    l: {k: 4, v: 4, l: null, r: null},
                    r: null
                }
            });
        });
        it('remove a node with one child: ', function() {
            chai.expect(bst.remove(5, tree1, true)).eql({
                k: 3,
                v: 3,
                l: {
                    k: 1,
                    v: 1,
                    l: {k: 0, v: 0, l: null, r: null},
                    r: {k: 2, v: 2, l: null, r: null}
                },
                r: {k: 4, v: 4, l: null, r: null}
            });
        });
        it('returns original tree if key not found: ', function() {
            chai.expect(bst.remove(8, tree1, true)).eql(tree1);
        });
        it('returns null if a single node tree has that node deleted: ', function() {
            chai.expect(bst.remove(0, {k: 0, v: 0, l: null, r: null})).null;
        });
        it('does not mutate original object: ', function() {
            bst.remove(2, tree1, true);
            chai.expect(tree1).eql({
                k: 3,
                v: 3,
                l: {
                    k: 1,
                    v: 1,
                    l: {k: 0, v: 0, l: null, r: null},
                    r: {k: 2, v: 2, l: null, r: null}
                },
                r: {
                    k: 5,
                    v: 5,
                    l: {k: 4, v: 4, l: null, r: null},
                    r: null
                }
            });
        });
        describe('remove a node with two children', function() {
            it('Successor, neither children have children: ', function() {
                chai.expect(bst.remove(1, tree1, true)).eql({
                    // 2 replaces 1
                    k: 3,
                    v: 3,
                    l: {
                        k: 2,
                        v: 2,
                        l: {k: 0, v: 0, l: null, r: null},
                        r: null
                    },
                    r: {
                        k: 5,
                        v: 5,
                        l: {k: 4, v: 4, l: null, r: null},
                        r: null
                    }
                });
            });
            it('Predecessor, neither children have children: ', function() {
                chai.expect(bst.remove(1, tree1, false)).eql({
                    // 0 replaces 1
                    k: 3,
                    v: 3,
                    l: {
                        k: 0,
                        v: 0,
                        l: null,
                        r: {k: 2, v: 2, l: null, r: null}
                    },
                    r: {
                        k: 5,
                        v: 5,
                        l: {k: 4, v: 4, l: null, r: null},
                        r: null
                    }
                });
            });
            it('Successor, children have children: ', function() {
                chai.expect(bst.remove(3, tree2, true)).eql({
                    // 4 replaces 3
                    k: 7,
                    v: 7,
                    l: {
                        k: 4,
                        v: 4,
                        l: {
                            k: 1,
                            v: 1,
                            l: {k: 0, v: 0, l: null, r: null},
                            r: {k: 2, v: 2, l: null, r: null}
                        },
                        r: {
                            k: 5,
                            v: 5,
                            l: null,
                            r: {k: 6, v: 6, l: null, r: null}
                        }
                    },
                    r: {
                        k: 11,
                        v: 11,
                        l: {
                            k: 9,
                            v: 9,
                            l: {k: 8, v: 8, l: null, r: null},
                            r: {k: 10, v: 10, l: null, r: null}
                        },
                        r: {
                            k: 13,
                            v: 13,
                            l: {k: 12, v: 12, l: null, r: null},
                            r: {k: 14, v: 14, l: null, r: null}
                        }
                    }
                });
            });
            it('Predecessor, children have children: ', function() {
                chai.expect(bst.remove(11, tree2, false)).eql({
                    // 10 replaces 11
                    k: 7,
                    v: 7,
                    l: {
                        k: 3,
                        v: 3,
                        l: {
                            k: 1,
                            v: 1,
                            l: {k: 0, v: 0, l: null, r: null},
                            r: {k: 2, v: 2, l: null, r: null}
                        },
                        r: {
                            k: 5,
                            v: 5,
                            l: {k: 4, v: 4, l: null, r: null},
                            r: {k: 6, v: 6, l: null, r: null}
                        }
                    },
                    r: {
                        k: 10,
                        v: 10,
                        l: {
                            k: 9,
                            v: 9,
                            l: {k: 8, v: 8, l: null, r: null},
                            r: null
                        },
                        r: {
                            k: 13,
                            v: 13,
                            l: {k: 12, v: 12, l: null, r: null},
                            r: {k: 14, v: 14, l: null, r: null}
                        }
                    }
                });
            });
            it('Successor, but successor isnt at lowest depth: ', function() {
                chai.expect(bst.remove(3, tree3, true)).eql({
                    // 5 replaces 3
                    k: 7,
                    v: 7,
                    l: {
                        k: 5,
                        v: 5,
                        l: {
                            k: 1,
                            v: 1,
                            l: {k: 0, v: 0, l: null, r: null},
                            r: null
                        },
                        r: {
                            k: 6,
                            v: 6,
                            l: null,
                            r: null
                        }
                    },
                    r: null
                });
            });
            it('Predecessor, but predecessor isnt at lowest depth: ', function() {
                chai.expect(bst.remove(3, tree3, false)).eql({
                    // 1 replaces 3
                    k: 7,
                    v: 7,
                    l: {
                        k: 1,
                        v: 1,
                        l: {
                            k: 0,
                            v: 0,
                            l: null,
                            r: null
                        },
                        r: {
                            k: 5,
                            v: 5,
                            l: null,
                            r: {k: 6, v: 6, l: null, r: null}
                        }
                    },
                    r: null
                });
            });
            it('Successor, remove root node: ', function() {
                chai.expect(bst.remove(7, tree2, true)).eql({
                    // 8 replaces 7
                    k: 8,
                    v: 8,
                    l: {
                        k: 3,
                        v: 3,
                        l: {
                            k: 1,
                            v: 1,
                            l: {k: 0, v: 0, l: null, r: null},
                            r: {k: 2, v: 2, l: null, r: null}
                        },
                        r: {
                            k: 5,
                            v: 5,
                            l: {k: 4, v: 4, l: null, r: null},
                            r: {k: 6, v: 6, l: null, r: null}
                        }
                    },
                    r: {
                        k: 11,
                        v: 11,
                        l: {
                            k: 9,
                            v: 9,
                            l: null,
                            r: {k: 10, v: 10, l: null, r: null}
                        },
                        r: {
                            k: 13,
                            v: 13,
                            l: {k: 12, v: 12, l: null, r: null},
                            r: {k: 14, v: 14, l: null, r: null}
                        }
                    }
                });
            });
            it('Predecessor, remove root node: ', function() {
                chai.expect(bst.remove(7, tree2, false)).eql({
                    // 6 replaces 7
                    k: 6,
                    v: 6,
                    l: {
                        k: 3,
                        v: 3,
                        l: {
                            k: 1,
                            v: 1,
                            l: {k: 0, v: 0, l: null, r: null},
                            r: {k: 2, v: 2, l: null, r: null}
                        },
                        r: {
                            k: 5,
                            v: 5,
                            l: {k: 4, v: 4, l: null, r: null},
                            r: null
                        }
                    },
                    r: {
                        k: 11,
                        v: 11,
                        l: {
                            k: 9,
                            v: 9,
                            l: {k: 8, v: 8, l: null, r: null},
                            r: {k: 10, v: 10, l: null, r: null}
                        },
                        r: {
                            k: 13,
                            v: 13,
                            l: {k: 12, v: 12, l: null, r: null},
                            r: {k: 14, v: 14, l: null, r: null}
                        }
                    }
                });
            });
        });
    });

    describe('search()', function() {
        /*
        [0, 1, 2, 3, 4, 5, 6]
             3
           /   \
          1     5
         / \   / \
        0   2 4   6
        */
        const tree1 = {
            k: 3,
            v: 3,
            l: {
                k: 1,
                v: 1,
                l: {k: 0, v: 0, l: null, r: null},
                r: {k: 2, v: 2, l: null, r: null}
            },
            r: {
                k: 5,
                v: 5,
                l: {k: 4, v: 4, l: null, r: null},
                r: {k: 6, v: 6, l: null, r: null}
            }
        };
        it('returns the value of the found key: ', function() {
            chai.expect(bst.search(2, tree1)).equal(2);
        });
        it('finds when key is the root node: ', function() {
            chai.expect(bst.search(3, tree1)).equal(3);
        });
        it('finds when search goes left and right: ', function() {
            chai.expect(bst.search(2, tree1)).equal(2);
        });
        it('finds when search goes right and left: ', function() {
            chai.expect(bst.search(4, tree1)).equal(4);
        });
        it('returns null when key was not found: ', function() {
            chai.expect(bst.search(7, tree1)).null;
        });
    });

    describe('traverse()', function() {
        /*
        [0, 1, 2, 3, 4, 5, 6]
             3
           /   \
          1     5
         / \   / \
        0   2 4   6
        */
        const tree1 = {
            k: 3,
            v: 3,
            l: {
                k: 1,
                v: 1,
                l: {k: 0, v: 0, l: null, r: null},
                r: {k: 2, v: 2, l: null, r: null}
            },
            r: {
                k: 5,
                v: 5,
                l: {k: 4, v: 4, l: null, r: null},
                r: {k: 6, v: 6, l: null, r: null}
            }
        };
        /*
        [0, 1, 2, 3]
        0
         \
          1
           \
            2
             \
              3
        */
        const tree2 = {
            k: 0, v: 0, l: null, r: {
                k: 1, v: 1, l: null, r: {
                    k: 2, v: 2, l: null, r: {
                        k: 3, v: 3, l: null, r: null
                    }
                }
            }
        };
        it('traverses in order on balanced tree: ', function() {
            chai.expect(bst.traverse(tree1)).eql([
                {k: 0, v: 0},
                {k: 1, v: 1},
                {k: 2, v: 2},
                {k: 3, v: 3},
                {k: 4, v: 4},
                {k: 5, v: 5},
                {k: 6, v: 6}
            ]);
        });
        it('traverses in order on unbalanced tree: ', function() {
            chai.expect(bst.traverse(tree2)).eql([
                {k: 0, v: 0},
                {k: 1, v: 1},
                {k: 2, v: 2},
                {k: 3, v: 3}
            ]);
        });
    });

    describe('createFromOrderedArray()', function() {
        /*
        [0, 1, 2, 3, 4, 5, 6]
             3
           /   \
          1     5
         / \   / \
        0   2 4   6
        */
        const arr1 = [
            {k: 0, v: 0},
            {k: 1, v: 1},
            {k: 2, v: 2},
            {k: 3, v: 3},
            {k: 4, v: 4},
            {k: 5, v: 5},
            {k: 6, v: 6}
        ];
        const tree1 = {
            k: 3,
            v: 3,
            l: {
                k: 1,
                v: 1,
                l: {k: 0, v: 0, l: null, r: null},
                r: {k: 2, v: 2, l: null, r: null}
            },
            r: {
                k: 5,
                v: 5,
                l: {k: 4, v: 4, l: null, r: null},
                r: {k: 6, v: 6, l: null, r: null}
            }
        };
        const arr2 = [
            {k: 0, v: 'red'},
            {k: 1, v: 'orange'},
            {k: 2, v: 'yellow'}
        ];
        const tree2 = {
            k: 1,
            v: 'orange',
            l: {k: 0, v: 'red', l: null, r: null},
            r: {k: 2, v: 'yellow', l: null, r: null}
        };
        it('returned tree is balanced: ', function() {
            chai.expect(bst.createFromOrderedArray(arr1)).eql(tree1);
        });
        it('empty array returns null: ', function() {
            chai.expect(bst.createFromOrderedArray([])).null;
        });
        it('values do not impact order: ', function() {
            chai.expect(bst.createFromOrderedArray(arr2)).eql(tree2);
        });
    });

    describe('createFromArray()', function() {
        const arr1 = [5, 3, 7];
        const arr2 = [0, 1, 2, 3];
        const arr3 = [5, 3, 7, 3];
        it('values are indexes from array: ', function() {
            chai.expect(bst.createFromArray(arr1)).eql({
                k: 5,
                v: 0,
                l: {k: 3, v: 1, l: null, r: null},
                r: {k: 7, v: 2, l: null, r: null}
            });
        });
        it('values are inserted in index order, not balanced: ', function() {
            chai.expect(bst.createFromArray(arr2)).eql({
                k: 0,
                v: 0,
                l: null,
                r: {
                    k: 1,
                    v: 1,
                    l: null,
                    r: {
                        k: 2,
                        v: 2,
                        l: null,
                        r: {k: 3, v: 3, l: null, r: null}
                    }
                }
            });
        });
        it('duplicate items are overwritten, last occurance is used: ', function() {
            chai.expect(bst.createFromArray(arr3)).eql({
                k: 5,
                v: 0,
                l: {k: 3, v: 3, l: null, r: null},
                r: {k: 7, v: 2, l: null, r: null}
            });
        });
        it('empty array returns null: ', function() {
            chai.expect(bst.createFromArray([])).null;
        });
    });

    describe('height()', function() {
        /*
        [0, 1, 2, 3, 4, 5, 6]
             3
           /   \
          1     5
         / \   / \
        0   2 4   6
        */
        const tree1 = {
            k: 3,
            v: 3,
            l: {
                k: 1,
                v: 1,
                l: {k: 0, v: 0, l: null, r: null},
                r: {k: 2, v: 2, l: null, r: null}
            },
            r: {
                k: 5,
                v: 5,
                l: {k: 4, v: 4, l: null, r: null},
                r: {k: 6, v: 6, l: null, r: null}
            }
        };
        /*
        [0, 1, 2, 3]
        0
         \
          1
           \
            2
             \
              3
        */
        const tree2 = {
            k: 0, v: 0, l: null, r: {
                k: 1, v: 1, l: null, r: {
                    k: 2, v: 2, l: null, r: {
                        k: 3, v: 3, l: null, r: null
                    }
                }
            }
        };
        it('balanced tree: ', function() {
            chai.expect(bst.height(tree1)).equal(2);
        });
        it('unbalanced tree: ', function() {
            chai.expect(bst.height(tree2)).equal(3);
        });
        it('root only: ', function() {
            chai.expect(bst.height({k: 0, v: 0, l: null, r: null})).equal(0);
        });
        it('null returns -1: ', function() {
            chai.expect(bst.height(null)).equal(-1);
        });
    });

    describe('balance()', function() {
        /*
        [0, 1, 2]
        0
         \
          1
           \
            2
        */
        const tree1 = {
            k: 0, v: 0, l: null, r: {
                k: 1, v: 1, l: null, r: {
                    k: 2, v: 2, l: null, r: null
                }
            }
        };
        it('balances tree correctly: ', function() {
            chai.expect(bst.balance(tree1)).eql({
                k: 1,
                v: 1,
                l: {k: 0, v: 0, l: null, r: null},
                r: {k: 2, v: 2, l: null, r: null}
            });
        });
        it('does not mutate original tree: ', function() {
            bst.balance(tree1);
            chai.expect(tree1).eql({
                k: 0, v: 0, l: null, r: {
                    k: 1, v: 1, l: null, r: {
                        k: 2, v: 2, l: null, r: null
                    }
                }
            });
        });
    });

    describe('nodesForHeight()', function() {
        it('height of -2 (invalid): ', function() {
            chai.expect(bst.nodesForHeight(-2)).equal(0);
        });
        it('height of -1 (breaking case): ', function() {
            chai.expect(bst.nodesForHeight(-1)).equal(0);
        });
        it('height of 0 (root only): ', function() {
            chai.expect(bst.nodesForHeight(0)).equal(1);
        });
        it('height of 1: ', function() {
            chai.expect(bst.nodesForHeight(1)).equal(3);
        });
        it('height of 2: ', function() {
            chai.expect(bst.nodesForHeight(2)).equal(7);
        });
        it('height of 3: ', function() {
            chai.expect(bst.nodesForHeight(3)).equal(15);
        });
        it('height of 4: ', function() {
            chai.expect(bst.nodesForHeight(4)).equal(31);
        });
    });
});
