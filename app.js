import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import logger from'morgan'
import cookieParser from 'cookie-parser'
import mongoose from "mongoose"
import session from 'express-session'
import bodyParser from 'body-parser'
const MongoStore = require('connect-mongo')(session)
import keys from './config/keys'
import consign from 'consign'
require("./models/user");


//Create express Applicaiton
var app = express();

//Create Connection to mongodb
mongoose.connect(keys.mongoUrl, { useMongoClient: true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: keys.cookieKey,
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  cookie:{maxAge:14400},
  saveUninitialized: true,
  resave: true
  }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/')); 
app.use('/vue', express.static(__dirname + '/node_modules/vue/dist/'));

var index = require('./routes/index');
app.use('/', index);

//Passport Initialization
require('./services/passportInit')(app);

//pass the express to authRoutes
require("./routes/authRoutes")(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
