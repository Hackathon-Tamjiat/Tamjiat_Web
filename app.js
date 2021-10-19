var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session");
var bodyParser = require('body-parser')
var helmet = require('helmet')
var indexRouter = require('./routes/index');
var businessRouter = require('./routes/business');
var companyRouter = require('./routes/company');
var dashRouter = require('./routes/dash');
var aiFlask =require('./routes/aiFlask');
var questionRouter = require('./routes/question');
var mysql = require('mysql');
const passport = require('passport');
const morgan = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));  // 클라이언트의 form값을 req.body에 넣음
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', indexRouter);
app.use('/business', businessRouter);
app.use('/company', companyRouter);
app.use('/dash', dashRouter);
app.use('/aiFlask', aiFlask);
app.use('/question', questionRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

/// multer
app.use(function(req,res,next){
  var dir = './public/image';
    if(!fs.existsSync(dir)) fs.mkdirSync(dir);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(helmet());
app.disable('x-powered-by'); //HELMET으로 X-powerde-by 안보이게 수정

module.exports = app;
