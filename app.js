
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , Ws = require('./ws')
  , app = module.exports = express.createServer()
  , server = new Ws.Server(app)
  , os = require('os');

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.listen(3000, function(){
  var ipaddr = os.networkInterfaces().net0[0].address;
  console.log("Browser Access >> http://" + ipaddr + ":" + app.address().port);
});
