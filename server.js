var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');

var configDB = require('./config/database.js');

app.set('view engine', 'ejs');
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/public'));
mongoose.connect(configDB.url);


app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
app.use(bodyParser.urlencoded({extended: true}));


app.use(session({secret: 'ilovecoding' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./config/passport')(passport);
require('./app/routes.js')(app, passport);

app.listen(port);
console.log("App listening at " + port);