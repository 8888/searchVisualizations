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

const sortedInsert = (value, arr, duplicates = false, index = 0) => {
    // inserts a value into an already sorted array
    // returns a new array that is still sorted
    // duplicates bool controls if inserting a duplicate value is allowed
    // default as false because it will break binary searching
    // index is default at 0 and is used for recursion
    if (value === arr[index]) {
        if (duplicates) {
            // value is a duplicate of this element
            // insert at index before
            return arr.slice(0, index).concat(value, arr.slice(index));
        } else {
            // value is a duplicate and this isn't allowed
            return arr;
        }
    } else if (value > arr[index]) {
        // value is still greater then value at this index
        // check the next index
        if (index + 1 < arr.length) {
            // next index is in range
            return sortedInsert(value, arr, duplicates, index + 1);
        } else {
            // next index is out of range
            // insert at the end
            return arr.concat(value);
        }
    } else {
        // value is now less than value at this index
        // insert at index before
        return arr.slice(0, index).concat(value, arr.slice(index));
    }
};

const remove = (value, arr) => {
    // removes the value from a sorted array
    // used binarySearch to find the index to remove
    // returns a new array without that value
    // returns the original array if value is not found
    const index = binarySearch(arr, value);
    if (index === -1) {
        // value was not found
        return arr;
    } else {
        // value was found
        return arr.slice(0, index).concat(arr.slice(index + 1));
    }
};

const generateSearchField = (length, interval, result = []) => {
    // generates a psuedo random search field
    // the numbers should be different, but have a feel that they go together
    // all values are integers greater than zero
    // length is the desired length of the array
    // interval is max difference between two sequential values
    // returns an ordered array of non duplicating values
    if (result.length >= length) {
        // should never be greater than
        return result;
    }
    // random number between 1 and interval, both inclusive
    const rand = Math.floor((Math.random() * interval) + 1);
    const lastValue = result.length ? result[result.length - 1] : 0;
    const field = result.concat(lastValue + rand);
    return generateSearchField(length, interval, field);
};

export {
    binarySearch,
    binarySearchPath,
    sortedInsert,
    remove,
    generateSearchField
};
