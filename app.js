var createError = require('http-errors');
var express = require('express');
const path=require("path")
const cors = require("cors")
var logger = require('morgan');
const mongoose = require('mongoose');
const dotenv=require("dotenv")
const multer = require("multer");
const upload = multer({ dest: "assets/" });
const { check, validationResult } = require("express-validator");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const adminRouter=require('./routes/admin');
const categoryRouter=require('./routes/category');
const productRouter=require('./routes/products');
const orderRouter=require('./routes/order');
const tasksRouter=require('./routes/tasks')
const searchRouter=require('./routes/search')
const stripe = require('./routes/stripe')
const authMW=require("./MiddleWare/authenicatedMW");


dotenv.config()
var app = express();


// view engine setup

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
mongoose
  .connect("mongodb://127.0.0.1:27017/shopping33")
  // .connect("mongodb+srv://hossam:hossam@cluster0.edtspfh.mongodb.net/shopping")
  .then(() => {
    console.log("Connecting To DB...");
  })
  .catch((err) => {
    console.log("error on connection DB" + err);
  });


app.use(express.static("public"))
app.use(express.static(path.join(__dirname, 'assets')))
app.use("/assets", express.static("assets"))
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/admin", adminRouter);
// app.use(authMW);
app.use('/category', categoryRouter)
app.use('/products', productRouter);
app.use('/order', orderRouter);
app.use("/search", searchRouter)
app.use("/checkout", stripe);

app.use("/tasks", tasksRouter);

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
  res.json({
    message: err.message
  })
});

module.exports = app;
