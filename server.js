var express = require('express');
	app = express(),
    config = require('./config/config'),
    port = process.env.PORT || config.port,
    mongoose = require('mongoose'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    path = require('path'),
    passport = require('passport'),
    rewrite = require('express-urlrewrite');

mongoose.connect(config.database.url);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: 'dev'
}));
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');

app.use('/client', express.static(__dirname + '/client'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/layouts', express.static(__dirname + '/views/layouts'));

app.use(rewrite('/*.html', '/$1'));

require('./server/routers/api')(app);
require('./server/routers/auth')(app);
require('./server/routers/main')(app);
app.listen(port);
console.log("Welcome to Haidangdev's Blog " + config.port);