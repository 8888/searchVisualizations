'use strict';

const node = (key, value) => {
    // creates the basic data structure used
    // key is the number to order by
    // if this was a sorted array:
    // key would be item in array
    // value would be the index
    // value is what is stored
    // l & r = left and right nodes
    return {k: key, v: value, l: null, r: null};
};

const insert = (node, tree) => {};

export {node, insert};
