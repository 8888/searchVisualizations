'use strict';

const node = (key, value, left = null, right = null) => {
    // creates the basic data structure used
    // key is the number to order by
    // if this was a sorted array:
    // key would be item in array
    // value would be the index
    // value is what is stored
    // l & r = left and right nodes
    return {k: key, v: value, l: left, r: right};
};

const insert = (key, value, tree) => {
    // inserts a node into a binary search tree
    // returns the new tree
    // uses recursion with each lower node being passed as tree
    if (key == tree.k) {
        // node key already exists
        // replace value
        return node(key, value, tree.l, tree.r);
    } else if (key < tree.k) {
        // move down the tree to the left
        if (tree.l) {
            // left node exists
            // recursively call insert w/ left node
            return node(tree.k, tree.v, insert(key, value, tree.l), tree.r);
        } else {
            // insert into left node
            return node(tree.k, tree.v, node(key, value), tree.r);
        }
    } else {
        // move down the tree to the right
        if (tree.r) {
            // right node exists
            // recursively call insert w/ right node
            return node(tree.k, tree.v, tree.l, insert(key, value, tree.r));
        } else {
            // insert into right node
            return node(tree.k, tree.v, tree.l, node(key, value));
        }
    }
};

const search = (key, tree) => {
    // finds the key in the provided binary search tree
    // returns the value stored
    // returns null if the key was not found
    // uses recursion with each lower node being passed as tree
    if (key === tree.k) {
        // key found, return value
        return tree.v;
    } else if (key < tree.k) {
        // move down the tree to the left
        if (tree.l) {
            // left node exists
            // recursively call search w/ left node
            return search(key, tree.l);
        } else {
            // there is no left node
            // key does not exist in tree
            return null;
        }
    } else {
        // move down the tree to the right
        if (tree.r) {
            // right node exists
            // recursively call search w/ right node
            return search(key, tree.r);
        } else {
            // there is no right node
            // key does not exist in tree
            return null;
        }
    }
};

export {node, insert, search};
