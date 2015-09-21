'use strict';

// Module dependencies.
var express = require('express');

var app = express();
var server = require('http').createServer(app);

// Express Configuration
app.configure('development', function () {
  app.use(require('connect-livereload')());
});

app.configure(function () {
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.cookieSession({
    secret: 'ffoisaiods984'
  }));
  app.use(express.methodOverride());
  app.use(function (req, res, next) {
    var nodeSSPI = require('node-sspi');
    var nodeSSPIObj = new nodeSSPI({
      retrieveGroups: true
      ,offerSSPI: false
      ,offerBasic: true
    });
    nodeSSPIObj.authenticate(req, res, function(err){
      res.finished || next();
    });
  });
  app.use(function (req, res, next) {
    var out = 'Hello ' + req.connection.user + '! You belong to following groups:<br/><ul>';
    if (req.connection.userGroups) {
      for (var i in req.connection.userGroups) {
        out += '<li>'+ req.connection.userGroups[i] + '</li><br/>\n';
      }
    }
    out += '</ul>';
    res.send(out);
  });
});

// Start server
var port = process.env.PORT || 3000;
server.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});