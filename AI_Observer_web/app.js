var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var shipobRouter = require('./routes/shipob');
var marketobRouter = require('./routes/marketob');
var equipmentRouter = require('./routes/equipment');
var shipRouter = require('./routes/ship');
var calendarRouter = require('./routes/calendar');
var tacinfoRouter = require('./routes/tacinfo');
var memoRouter = require('./routes/memo');
var mattersRouter = require('./routes/matters');
var organiztionRouter = require('./routes/organiztion');
var noticeRouter = require('./routes/notice');
var dataRouter = require('./routes/data');
var fishRouter = require('./routes/fish');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/shipob', shipobRouter);
app.use('/marketob', marketobRouter);
app.use('/equipment', equipmentRouter);
app.use('/ship', shipRouter);
app.use('/calendar', calendarRouter);
app.use('/tacinfo', tacinfoRouter);
app.use('/memo', memoRouter);
app.use('/matters', mattersRouter);
app.use('/organiztion', organiztionRouter);
app.use('/notice',noticeRouter);
app.use('/data',dataRouter);
app.use('/fish',fishRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
