# Search Visualizations
Visualizations of common computer science search algorithms. Searches are shown using HTML5 canvas elements and logic is in JavaScript.

# Local Development
ES6 modules are used to import/export code and most browsers now support this without the use of any bundling library. Since local development runs into CORS issues when trying to import from the file system, local files need to be served by a simple web server.

### PHP
```shell
$ php -S 127.0.0.1:8000
```
Credit and MANY more ways to start a webserver: [willurd](https://gist.github.com/willurd/5720255)

There are currently no dependencies as this is written in vanilla js and avoids bundling. Testing is also web-based, and the browser loads the packages from [unpkg](https://unpkg.com/#/) as scripts.

# Tests
Tests are run using [Mocha](https://mochajs.org/) as the test framework and [Chai](http://www.chaijs.com/) as the assertion library.  
Local test results can be seen at [http://localhost:8000/test/test.html](http://localhost:8000/test/test.html) (remember to start the webserver first)
