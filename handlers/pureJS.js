'use strict';

var testFunction = require('./testFunction');

var PureJS = function () {
    this.parallel = function (options, callback) {
        var count = options.count || 3;
        var checkCount = 0;
        var checkCallback = function () {
            checkCount++;
            console.log('>>> check', checkCount);
            if (checkCount === count) {
                console.log('>>> callback()');
                callback();
            }
        };

        count = +count;
        for (var i = 0; i < count; i++) {
            console.log('>>> i =', i);
            testFunction(options, checkCallback);
        }
    }
};

module.exports = new PureJS();