const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const dashboardRouter = require('./routes/dashboard');
const documentRouter = require('./routes/document');
const editRouter = require('./routes/edit');
const editpasswordRouter = require('./routes/editpassword');
const swaggerRouter = require('./routes/swagger');
const swaggerUi = require('./node_modules/swagger-ui-express'),
  swaggerDocument = require('./environment/swagger.json');
const app = express();

const admin = require("firebase-admin");

const serviceAccount = require("./environment/serviceAccountKey.json");

const {origin, databaseURL} = require("./environment/config.js");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: databaseURL
});

const cors = require('cors');

const corsOptions = {
  origin: origin,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/swagger', swaggerRouter);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/dashboard', dashboardRouter);
app.use('/document', documentRouter);
app.use('/edit', editRouter);
app.use('/editpassword', editpasswordRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
