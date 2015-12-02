'use strict';

var async = require('async');

var TestsModule = function () {

    this.seriesEmulationInNativeCode = function (req, res, next) {
        var count = 1;
        var result = [];

        console.log('--------------- seriesEmulationInNativeCode -------------------');

        function f1 () {
            setTimeout(function(){
                console.log('1 = ', count++);
                callback(null, '1');
            }, 1000);
        }
        function f2 (callback) {
            setTimeout(function(){
                console.log('2 = ', count++);
                callback(null, '2');
            }, 1000);
        }
        function f3 (callback) {
            setTimeout(function(){
                console.log('3 = ', count++);
                callback(null, '3');
            }, 1000);
        }
        function f4 (callback) {
            setTimeout(function(){
                console.log('4 = ', count++);
                callback(null, '4');
            }, 1000);
        }
        function f5 () {
            setTimeout(function(){
                console.log('5 = ', count++);
                callback(null, '5');
            }, 1000);
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
                    setTimeout(function(){
                        console.log('1');
                        callback(null, '1');
                    }, 1000);
                },

                function (callback) {
                    setTimeout(function(){
                        console.log('2');
                        callback(null, '2');
                    }, 500);
                },

                function (callback) {
                    setTimeout(function(){
                        console.log('3');
                        callback(null, '3');
                    }, 100);
                },

                function (callback) {
                    setTimeout(function(){
                        console.log('4');
                        callback(null, '4');
                    }, 600);
                },
                function (callback) {
                    setTimeout(function(){
                        console.log('5');
                        callback(null, '5');
                    }, 990);
                }
            ],
            function (err, results) {

                return res.send(results)
            });
        console.log(' ---- seriesExample ending ---- ');
    };

    this.waterfallExample = function (req, res, next) {
        var count = 1;

        console.log('--------------- waterfallExample -------------------');

        async.waterfall([
                function(callback){
                    console.log('one two');
                    callback(null, 'one', 'two');
                },

                function(arg1, arg2, callback){
                    console.log('three');
                    callback(null, 'three');
                },

                function(arg1, callback){
                    console.log('four');
                    callback(null, 'four');
                },

                function(arg1, callback){
                    console.log('five');
                    callback(null, 'five');
                },

                function(arg1, callback){
                    console.log('Ready');
                    callback(null, 'Ready');
                }

            ],
            function (err, result) {

                return res.send(result)
            });
        console.log('---- waterfallExample ending ----');
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
        console.log(' ----  badParallelExample ending ---- ');
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
        console.log(' ---- parallelExample ending ---- ');

    };

    this.objectTasksParallelExample = function (req, res, next) {
        var count = 1;

        console.log('--------------- parallelExample -------------------');

        async.parallel({
                one: function (callback) {
                    setTimeout(function () {
                        console.log('one = ', count++);
                        callback(null, 'TimeOut1');
                    }, 5000);
                },

                two: function (callback) {
                    setTimeout(function () {
                        console.log('two = ', count++);
                        callback(null, 'TimeOut2');
                    }, 100);
                },

                three: function (callback) {
                    for (var i = 100000; i > 0; i--) {
                    }
                    console.log('three = ', count++);
                    callback(null, '3');
                },

                four: function (callback) {
                    console.log('four = ', count++);
                    callback(null, '4');
                },

                five: function (callback) {
                    console.log('five = ', count++);
                    callback(null, 'five');
                },

                six: function (callback) {
                    console.log('six = ', count++);
                    callback(null, 'six');
                },

                seven: function (callback) {
                    console.log('seven = ', count++);
                    callback(null, 'seven');
                }

            },
            function (err, results) {

                return  res.send(results)
            });
        console.log(' ---- parallelExample ending ---- ');

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
            ],
            2,
            function(error, results) {
                return  res.send(results)
            });

        console.log(' ----  parallelLimitExample ending ---- ');
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

        console.log('----  doWhilstExample ending ---- ');
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

        console.log(' ----  foreverExample ending ---- ');
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

        console.log(' ---- duringExample ending ---- ');
    };

    this.timesExample = function (req, res, next) {
        // Pretend this is some complicated async factory
        var createUser = function(id, callback) {
            callback(null, {
                id: 'user' + id
            })
        };

        console.log('--------------- timesExample -------------------');

        // generate 5 users
        async.times(5, function(n, next){
            createUser(n, function(err, user) {
                console.log(user);
                next(err, user)
            })
        }, function(err, users) {
            // we should now have 5 users
            return res.send('timesExample ended  users count = ' + users.length)
        });
        console.log(' ---- timesExample ending ---- ');
    };

    this.retryExample = function (req, res, next) {
        var id = 0;
        var randomTime =  Math.random() * 1000;

        function sendCallbeck(callback) {
            return function () {
                callback(null, {
                    id: 'user' + id
                })
            }
        }

        // Pretend this is some complicated async factory
        var createUser = function(callback, result) {
            id++;
            randomTime =  Math.random() * 10000;
            console.log('randomTime:', Math.floor(randomTime));

            setTimeout(
                sendCallbeck(callback)
                , Math.floor(randomTime));
        };

        console.log('--------------- retryExample -------------------');
        async.retry({times: 3, interval: 100}, createUser, function(err, result) {
            // do something with the result
            console.log(result);
            return res.send('retryExample ended  users count = ' + result)
        });

        console.log(' ---- retryExample ending ---- ');
    };
};

module.exports = new TestsModule();