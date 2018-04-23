'use strict';

import { binarySearch } from './search.js';

let field, result;

field = [0,1,2,3,4,5,6,7,8,9];
result = binarySearch(field, 2); // returns path of indexes
console.log(field[result[result.length - 1]] == 2);

field = [123,4342,53453,123123,645645,];
result = binarySearch(field, 123123);
console.log(field[result[result.length - 1]] == 123123);

field = [0,1,2,3,4,5,6,7,8,9];
result = binarySearch(field, 10);
console.log(field[result[result.length - 1]] < 10);

field = [0,1,2,3,4,5,6,7,8,9];
result = binarySearch(field, -1);
console.log(field[result[result.length - 1]] > -1);
