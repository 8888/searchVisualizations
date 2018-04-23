'use strict';

export function binarySearch(field, target) {
    // uses a binary search to return the entire search path
    // search path is the index of each seen item
    // field is a sorted array of values to search through
    // target is the value to search for
    // returns the search path as an array even if value not found
    const path = [];
    let low = 0;
    let high = field.length - 1;
    while (low <= high) {
        const mid = Math.round((high + low) / 2);
        path.push(mid);
        if (field[mid] == target) {
            break;
        } else if (target < field[mid]) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return path;
}
