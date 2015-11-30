'use strict';

function testFunction(options, callback) {
    var timeout = options.timeout || 20;

    timeout = +timeout;

    setTimeout(function () {

        if (callback && (typeof callback === 'function')) {
            callback();
        }

    }, timeout);
}

module.exports = testFunction;