'use strict';

var async = require('async');

var TestsModule = function () {

    this.seriesEmulationInNativeCode = function (req, res, next) {
        var count = 1;
        var result = [];

        console.log('--------------- seriesEmulationInNativeCode -------------------');

        function f1 () {
            console.log('one = ', count++);
            callback (null, '1');
        }
        function f2 (callback) {
            console.log('two = ', count++);
            callback (null, '2');
        }
        function f3 (callback) {
            console.log('3 = ', count++);
            callback (null, '3');
        }
        function f4 (callback) {
            console.log('4 = ', count++);
            callback (null, '4');
        }
        function f5 () {
            console.log('5 = ', count++);
            callback (null, '5');
        }

        function callback (err, results) {

            if (err) {
                return next(err)
            }
            result.push(results);

            if (count === 6) {
              return  res.send(result)
            }
        }

        f1(callback);
        f2(callback);
        f3(callback);
        f4(callback);
        f5(callback);

        console.log('seriesEmulationInNativeCode ending');
    };

    this.seriesExample = function (req, res, next) {
        var count = 1;

        console.log('--------------- seriesExample -------------------');

        async.series([
                function (callback) {
                    console.log('one = ', count++);
                    callback(null, '1');
                },
                function (callback) {
                    console.log('two = ', count++);
                    callback(null, '2');
                },
                function (callback) {
                    console.log('3 = ', count++);
                    callback(null, '3');
                },
                function (callback) {
                    console.log('4 = ', count++);
                    callback(null, '4');
                },
                function (callback) {
                    console.log('5 = ', count++);
                    callback(null, '5');
                }

            ],
            function (err, results) {

                return res.send(results)
            });
        console.log('seriesExample ending');
    };

    this.badParallelExample = function (req, res, next) {
        var count = 1;

        console.log('--------------- badParallelExample -------------------');

        async.parallel([
                function (callback) {
                    for(var i = 100000; i>0; i--){
                    }
                    console.log('one = ', count++);
                    callback(null, '1');
                },
                function (callback) {
                    console.log('two = ', count++);
                    callback(null, '2');
                },
                function (callback) {
                    console.log('3 = ', count++);
                    callback(null, '3');
                },
                function (callback) {
                    console.log('4 = ', count++);
                    callback(null, '4');
                },
                function (callback) {
                    console.log('5 = ', count++);
                    callback(null, '5');
                }

            ],
            function (err, results) {

                return res.send(results)
            });
        console.log('badParallelExample ending');
    };

    this.parallelExample = function (req, res, next) {
        var count = 1;

        console.log('--------------- parallelExample -------------------');

        async.parallel([
                function(callback){
                    setTimeout(function(){
                        console.log('TimeOut1');
                        callback(null, 'TimeOut1');
                    }, 5000);
                },
                function(callback){
                    setTimeout(function(){
                        console.log('TimeOut2');
                        callback(null, 'TimeOut2');
                    }, 100);
                },
                function (callback) {
                    for(var i = 100000; i>0; i--){
                    }
                    console.log('one = ', count++);
                    callback(null, '1');
                },
                function (callback) {
                    console.log('two = ', count++);
                    callback(null, '2');
                },
                function (callback) {
                    console.log('3 = ', count++);
                    callback(null, '3');
                },
                function (callback) {
                    console.log('4 = ', count++);
                    callback(null, '4');
                },
                function (callback) {
                    console.log('5 = ', count++);
                    callback(null, '5');
                }

            ],
            function (err, results) {

               return  res.send(results)
            });
        console.log('parallelExample ending');

    };

    this.parallelLimitExample = function (req, res, next) {
        console.log('--------------- parallelLimitExample -------------------');

        async.parallelLimit([
            function(callback) {
                setTimeout(function() {
                    console.log('Task 1');
                    callback(null, 1);
                }, 300);
            },
            function(callback) {
                setTimeout(function() {
                    console.log('Task 2');
                    callback(null, 2);
                }, 200);
            },
            function(callback) {
                setTimeout(function() {
                    console.log('Task 3');
                    callback(null, 3);
                }, 100);
            }
        ], 2, function(error, results) {
            return  res.send(results)
        });

        console.log('parallelLimitExample ending');
    };

    this.whilstExample = function (req, res, next) {
        var count = 0;

        console.log('--------------- whilstExample -------------------');

        async.whilst(
            function () { return count < 5; },
            function (callback) {
                count++;
                setTimeout(function () {
                    console.log(count);
                    callback(null, count);
                }, 1000);
            },
            function (err, n) {
                return  res.send(' 5 seconds have passed, n = ' + count)
                    }
        );

        console.log('whilstExample ending');
    };

    this.doWhilstExample = function (req, res, next) {
        var count = 0;

        console.log('--------------- doWhilstExample -------------------');

        async.doWhilst(
            function (callback) {
                count++;
                setTimeout(function () {
                    console.log(count);
                    callback(null, count);
                }, 1000);
            },
            function () { return count < 5; },
            function (err, n) {
                return  res.send(' 5 seconds have passed, n = ' + count)
                    }
        );

        console.log('doWhilstExample ending');
    };

    this.foreverExample = function (req, res, next) {
        var count = 0;

        console.log('--------------- foreverExample -------------------');

        async.foreverExample(
            function (next) {
                count++;
                if (count === 5) {
                    return next('stop')
                }
                setTimeout(function () {
                    console.log(count);
                    next(null);
                }, 1000);
            },
            function () {
                return res.send('foreverExample stoped om  count = ' + count)
                    }
        );

        console.log('foreverExample ending');
    };

    this.duringExample = function (req, res, next) {
        var count = 0;

        console.log('--------------- duringExample -------------------');

        async.duringExample(
            function (callback) {
                return callback(null, count < 5);
            },
            function (callback) {
                count++;
                console.log(count);
                setTimeout(callback, 1000);
            },
            function (err) {

                return res.send('duringExample ended  count = ' + count)
            }
        );

        console.log('duringExample ending');
    };
};

module.exports = new TestsModule();