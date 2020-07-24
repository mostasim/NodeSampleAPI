var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
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
});*/
var Pusher = require('pusher');

var pusher = new Pusher({
    appId: '1042930',
    key: '01613651d1749a23fcc0',
    secret: 'fdaa991180a45f28afa8',
    cluster: 'ap2',
    encrypted: true
});


app.get('/foods/:query?', (req, res) => {
    // const foods_r = foods();

    if (req.query.query != undefined) {
        const query = req.query.query.toLowerCase();
        pusher.trigger('my-channel', 'my-event', {
            'message': query
        });
        return res.send({
            foods: query
        });
    }

    return res.send({
        foods: "Test Food",
    });
});

module.exports = app;
