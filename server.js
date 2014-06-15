'use strict';

// Module dependencies.
var express = require('express');

var app = express();
var server = require('http').createServer(app);

// Express Configuration
app.configure('development', function() {
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
  // prevent IE caching
  app.use(function (req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    
    var nodeSSPI = require('node-sspi');
    var inst = new nodeSSPI({name:'hello'})
    res.send(inst.sayHello() + ' ' + req.get('remote_user'));
  });
});

// bootstrap to get sites and users array async when using mongoose
// Start server
var port = process.env.PORT || 3000;
server.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});