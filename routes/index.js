'use strict';

var express = require('express');
var router = express.Router();
var async = require('async');
var tests = require('../handlers/tests');

router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.get('/purejs/parallel', function (req, res, next) {
    var options = req.query;
    //res.status(200).send({success: 'true'});

    tests.parallel(options, function (err, results){
        if (err) {
            return next(err);
        }
        res.status(200).send({success: 'true', results: results});
    });
});


router.get('/test', function (req, res, next) {
    var count = 10;
    var i = 0;

    console.log('>>> start');

    (function () {
        console.time('first while');
        var i = 0;
        while (i < count) {
            console.log('>>> first while i = ', i++);
        }
        console.timeEnd('first while');
    })();

    (function () {
        var i = 0;
        console.time('async while');
        async.whilst(
            function test() {
                return i < count;
            }, function body(cb) {

                console.log('>>> async.whilst i =', i++);
                /*console.log('>>> async.whilst i =', i++);
                setTimeout(function () {
                    cb();
                }, 2);*/
                async.setImmediate(function () {
                    cb();
                });

            }, function whilstCallback(err, result) {
                console.log('>>> whilstCallback');
                console.timeEnd('async while');
            }
        );
    })();

    (function () {
        var i = 0;
        console.time('second while');
        while (i < count) {
            console.log('>>> second while i = ', i++);
        }
        console.timeEnd('second while');
    })();

    console.log('>>> end');
    res.status(200).send({success: 'OK'});
});

module.exports = router;