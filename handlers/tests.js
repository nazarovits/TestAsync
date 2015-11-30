'use strict';

var async = require('async');
var pureJS = require('../handlers/pureJS');
var asyncJS = require('../handlers/asyncJS');

function calcAverage(arr) {
    var len = arr.length;
    var sum = 0;

    for (var i=0; i<len; i++) {
        sum+= arr[i];
    }

    return sum/len;
}

function parallelTask(options) {
    return function (cb) {
        var before = new Date().valueOf();
        pureJS.parallel(options, function (err) {
            var after = new Date().valueOf();
            var result  = after - before;

            cb(err, result);
        });
    }
}

var TestsModule = function () {
    this.parallel = function (options, callback) {
        var count = 100;
        var tasks = [];
        var task;

        for (var i=0; i<count; i++) {
            task = parallelTask(options);
            tasks.push(task);
        }

        console.log(tasks);

        async.parallel(tasks, function (err, milliseconds) {
            var results;
            var average;

            if (err) {
                return callback(err);
            }

            results = {
                milliseconds: milliseconds,
                average: calcAverage(milliseconds)
            };

            callback(null, results);
        });

        /*async.each(tasks,
            function (task, index) {
                var beforeRun = new Date();

                task(function ());
            },
            function (err, result) {
                callback();
        });*/

    }
};

module.exports = new TestsModule();