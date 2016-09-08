var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')

var router = express.Router()

var routes = require('./routes/index');

var app = express();

// view engine setup

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;