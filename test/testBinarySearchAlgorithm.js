'use strict';

import { binarySearch } from '../search/binarySearchAlgorithm.js';

describe('binarySearch()', function() {
    it('should have index of target as last item in result: ', function() {
        chai.expect(binarySearch([0,1,2,3,4,5,6,7,8,9], 4)[2]).equal(4);
    });
    it('should return when target was found: ', function() {
        chai.expect(binarySearch([0,1,2,3,4,5,6,7,8,9], 5)[1]).undefined;
    });
    it('should return entire search path: ', function() {
        chai.expect(binarySearch([0,1,2,3,4,5,6,7,8,9], 3)).eql([5,2,4,3]);
    });
    describe('should return a path even if target not found', function() {
        it('target is greater than upper bound: ', function() {
            chai.expect(binarySearch([0,1,2,3,4,5,6,7,8,9], 10)).eql([5,8,9]);
        });
        it('target is less than upper bound: ', function() {
            chai.expect(binarySearch([0,1,2,3,4,5,6,7,8,9], -1)).eql([5,2,1,0]);
        });
        it('target is within the bounds: ', function() {
            chai.expect(binarySearch([0,1,2,3,4,6,7,8,9], 5)).eql([4,7,6,5]);
        });
    });
    it('should have index of target as last item in result: ', function() {
        chai.expect(binarySearch([123,4342,53453,123123,645645], 123123)[2]).equal(3);
    });
});
