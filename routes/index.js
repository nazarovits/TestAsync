'use strict';

var express = require('express');
//var router = express.Router();
var async = require('async');
var tests = require('../handlers/tests');


module.exports = function (app) {
    var collectionsRouter = require('./collections')(app);
    var controlFollowsRouter = require('./controlFollows')(app);
    var loopsRouter = require('./loops')(app);

    app.use('/collections', collectionsRouter);
    app.use('/controlFollows', controlFollowsRouter);
    app.use('/loops', loopsRouter);

    app.get('/', function (req, res, next) {
        res.render('index', {
            title: 'Express'
        });
    });

    app.get('/purejs/parallel', function (req, res, next) {
        var options = req.query;
        //res.status(200).send({success: 'true'});

        tests.parallel(options, function (err, results){
            if (err) {
                return next(err);
            }
            res.status(200).send({success: 'true', results: results});
        });
    });

    app.get('/test', function (req, res, next) {
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


    function notFound(req, res, next) {
        var accepts = req.headers['accept'];

        res.status(404);

        if (accepts.indexOf('json') !== -1) {
            return res.json({error: 'Page Not Found'});
        }

        if (req.accepts('html')) {
            return res.send('Page Not Found');
        }

        res.type('txt');
        res.send('Page Not Found');
    }

    function errorHandler(err, req, res, next) {
        var status = err.status || 500;

        if (process.env.NODE_ENV === 'production') {
            if ((status === 401) || (status === 403)) {
                //logWriter.log('', err.message + '\n' + err.stack);
            }
            res.status(status).send({error: err.message});

        } else {
            if ((status === 401) || (status === 403)) {
                console.warn(err.message);
            } else {
                console.error(err.message);
                if (process.env.NODE_ENV !== 'test') console.error(err.stack);
                //logWriter.log('', err.message + '\n' + err.stack);
            }
            res.status(status).send({error: err.message, stack: err.stack});
        }

        //next();
    }

    app.use(notFound);
    app.use(errorHandler);
};