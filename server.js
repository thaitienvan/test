var express = require('express');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
const cron = require("node-cron");
const xlsx = require('node-xlsx');
const fs = require("fs");

var Excel = require("exceljs");
var moveFile = require('move-file');
var path = require('path');
const PubSub = require('pubsub-js');

var app = new express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const PORT = process.env.PORT || 1337;


app.listen(PORT, () => {
    console.log(`Project is listening on port: ${PORT}`);

});
var mySubscriber = function(msg, data) {
    console.log(msg, data);

};

var token = PubSub.subscribe('MY TOPIC', mySubscriber);
PubSub.publish('MY TOPIC', 'hello world!');
var studentRoute = require('./app/Routes/studentRoutes.js');
studentRoute(app);