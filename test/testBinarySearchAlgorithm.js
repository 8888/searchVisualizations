'use strict';

import * as bsa from '../search/binarySearchAlgorithm.js';

describe('binarySearchAlgorithm', function() {
    describe('binarySearch()', function() {
        let array1;
        beforeEach(function() {
            array1 = [1,2,3,4,5,6,7,8,9];
        });
        it('target is greater than mid: ', function() {
            chai.expect(bsa.binarySearch(array1, 8)).equal(7);
        });
        it('target is less than mid: ', function() {
            chai.expect(bsa.binarySearch(array1, 2)).equal(1);
        });
        it('target is the mid: ', function() {
            chai.expect(bsa.binarySearch(array1, 5)).equal(4);
        });
        it('returns -1 when target not found: ', function() {
            chai.expect(bsa.binarySearch(array1, 10)).equal(-1);
        });
        it('does not mutate original array: ', function() {
            bsa.binarySearch(array1, 8);
            chai.expect(array1).eql([1,2,3,4,5,6,7,8,9]);
        });
        it('handles an empty array: ', function() {
            chai.expect(bsa.binarySearch([], 8)).equal(-1);
        });
        it('handles single value array (target exists): ', function() {
            chai.expect(bsa.binarySearch([8], 8)).equal(0);
        });
        it('handles single value array (target does not exist): ', function() {
            chai.expect(bsa.binarySearch([2], 8)).equal(-1);
        });
    });

    describe('binarySearchPath()', function() {
        it('should have index of target as last item in result: ', function() {
            chai.expect(bsa.binarySearchPath([0,1,2,3,4,5,6,7,8,9], 4)[2]).equal(4);
        });
        it('should return when target was found: ', function() {
            chai.expect(bsa.binarySearchPath([0,1,2,3,4,5,6,7,8,9], 5)[1]).undefined;
        });
        it('should return entire search path: ', function() {
            chai.expect(bsa.binarySearchPath([0,1,2,3,4,5,6,7,8,9], 3)).eql([5,2,4,3]);
        });
        it('returns index, not value: ', function() {
            chai.expect(bsa.binarySearchPath([123,4342,53453,123123,645645], 123123)[2]).equal(3);
        });
        describe('should return a path even if target not found', function() {
            it('target is greater than upper bound: ', function() {
                chai.expect(bsa.binarySearchPath([0,1,2,3,4,5,6,7,8,9], 10)).eql([5,8,9]);
            });
            it('target is less than upper bound: ', function() {
                chai.expect(bsa.binarySearchPath([0,1,2,3,4,5,6,7,8,9], -1)).eql([5,2,1,0]);
            });
            it('target is within the bounds: ', function() {
                chai.expect(bsa.binarySearchPath([0,1,2,3,4,6,7,8,9], 5)).eql([4,7,6,5]);
            });
        });
    });

    describe('sortedInsert()', function() {
        let array1;
        beforeEach(function() {
            array1 = [2,4,6,8,10];
        });
        it('array remains sorted (element within values): ', function() {
            chai.expect(bsa.sortedInsert(5, array1)).eql([2,4,5,6,8,10]);
        });
        it('array remains sorted (element less than all values): ', function() {
            chai.expect(bsa.sortedInsert(1, array1)).eql([1,2,4,6,8,10]);
        });
        it('array remains sorted (element greater than all values): ', function() {
            chai.expect(bsa.sortedInsert(12, array1)).eql([2,4,6,8,10,12]);
        });
        it('original array is not mutated: ', function() {
            bsa.sortedInsert(5, array1);
            chai.expect(array1).eql([2,4,6,8,10]);
        });
        it('allows duplicates: ', function() {
            chai.expect(bsa.sortedInsert(8, array1, true)).eql([2,4,6,8,8,10]);
        });
        it('does not allow duplicates: ', function() {
            chai.expect(bsa.sortedInsert(8, array1)).eql([2,4,6,8,10]);
        });
        it('handles an empty array: ', function() {
            chai.expect(bsa.sortedInsert(8, [])).eql([8]);
        });
    });

    describe('remove()', function() {
        let array1;
        beforeEach(function() {
            array1 = [2,4,6,8,10];
        });
        it('array remains sorted after removal: ', function() {
            chai.expect(bsa.remove(8, array1)).eql([2,4,6,10]);
        });
        it('does not mutate original array: ', function() {
            bsa.remove(8, array1);
            chai.expect(array1).eql([2,4,6,8,10]);
        });
        it('returns original array if value not found: ', function() {
            chai.expect(bsa.remove(1, array1)).eql([2,4,6,8,10]);
        });
        it('removes one element if there are duplicates: ', function() {
            chai.expect(bsa.remove(2, [1,2,2,3])).eql([1,2,3]);
        });
    });
});
