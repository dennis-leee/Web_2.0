var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var settings = require('./settings');

var session = require('express-session');
var mongoStore = require('connect-mongo')(session);

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: settings.cookieSecret,
    key: settings.db,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},
    resave: true,
    saveUninitialized: false,
    store: new mongoStore({
        url: 'mongodb://localhost/' + settings.db
    })
}));

routes(app);

app.use(function(req, res, next) {    //捕获404并递交到处理器
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {    //错误处理器
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};  //处于开发环境则输出错误

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
