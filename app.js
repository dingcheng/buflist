
/**
 * Module dependencies.
 */
// Setting up db
require('./db.js');

var express = require('express')
  , routes = require('./routes')
  , buflist = require('./routes/buflist')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', buflist.home);
app.get('/tagshow/:tag', buflist.tagshow)
app.get('/newpost', buflist.newpost);
app.post('/', buflist.search_postreq);
app.post('/searchresult', buflist.search_postreq);
app.post('/newpost',buflist.newpost_postreq);

app.use(function(req, res, next){
  res.render('err.jade', {title: "404 - Page Not Found", errmsg:"Welcome to the famous 404 page -- trust me, you don't need what you're looking for...", showFullNav: false, status: 404, url: req.url });
});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
