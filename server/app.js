const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
const events = require('./routes/events');
const charge = require('./routes/charge');
const auth = require('./routes/auth');
const forceSsl = require('force-ssl-heroku');

app.use(forceSsl);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', express.static('build'));
app.use('/api/events', events);
app.use('/api/charge', charge);
app.use('/api/auth', auth);
app.use('/*', express.static('build'));

// catch 404 and forward to error handler - test
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
