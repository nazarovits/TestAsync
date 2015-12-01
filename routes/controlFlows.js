'use strict';

var express = require('express');
var controlFlow = require('../handlers/controlFlows');
var router = express.Router();

module.exports = function (app) {
    router.get('/', function (req, res) {
        res.send('Control Follows');
    });
    router.get('/seriesExample', controlFlow.seriesExample);
    router.get('/seriesEmulationInNativeCode', controlFlow.seriesEmulationInNativeCode);

    router.get('/badParallelExample', controlFlow.badParallelExample);
    router.get('/parallelExample', controlFlow.parallelExample);
    router.get('/parallelLimitExample', controlFlow.parallelLimitExample);

    router.get('/whilstExample', controlFlow.whilstExample);
    router.get('/doWhilstExample', controlFlow.doWhilstExample);

    router.get('/foreverExample', controlFlow.foreverExample);
    router.get('/duringExample', controlFlow.duringExample);



    return router;
};