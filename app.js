'use strict';
var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var fs = require('fs');
var router = express.Router({
    caseSensitive: true,
    strict: true
});
var app = express();

var httpServer = http.createServer(app);

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
//app.use(compression());
app.use(bodyParser.urlencoded({extended: false, limit: 1024 * 1024 * 5}));
app.use(bodyParser.json({limit: 1024 * 1024 * 5}));
app.use(methodOverride());

var allowCrossDomain = function (req, res, next) {
    var browser = req.headers['user-agent'];
    if (/Trident/.test(browser)) {
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    }
    next();
};
app.use(allowCrossDomain);
app.use(router);

require('./routes/index')(app, express);

httpServer.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

module.exports = {
    app: app
};
