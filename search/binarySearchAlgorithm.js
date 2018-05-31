'use strict';

const binarySearch = (field, target, low = 0, high = field.length - 1) => {
    // binary search algorithm
    // recursively cuts the search field in half
    // until the target is found or until low and high flip
    // return the index of the target value in the field
    // returns -1 if target was not found
    // low and high are optional as they will be used during recursion
    // field is a sorted array
    if (low > high) {
        return -1;
    }
    const mid = Math.round((low + high) / 2);
    if (field[mid] === target) {
        return mid;
    } else if (target < field[mid]) {
        // reduce field to lower half
        return binarySearch(field, target, low, mid - 1);
    } else {
        // reduce field to upper half
        return binarySearch(field, target, mid + 1, high);
    }
};

const binarySearchPath = (field, target, low = 0, high = field.length - 1, path = []) => {
    // uses a binary search to return the entire search path
    // search path is the index of each seen item
    // field is a sorted array of values to search through
    // target is the value to search for
    // returns the search path as an array even if value not found
    // very similair to binarySearch but has some extra overhead to track full path
    if (low > high) {
        return path;
    }
    const mid = Math.round((low + high) / 2);
    const updatedPath = path.concat(mid);
    if (field[mid] === target) {
        return updatedPath;
    } else if (target < field[mid]) {
        // reduce field to lower half
        return binarySearchPath(field, target, low, mid - 1, updatedPath);
    } else {
        // reduce field to upper half
        return binarySearchPath(field, target, mid + 1, high, updatedPath);
    }
};

export {
    binarySearch,
    binarySearchPath
};
