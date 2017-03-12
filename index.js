var express = require('express');
var app = express(),
    path = require('path'),
    fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var staticRoot = __dirname + '/dist';
var bodyParser = require('body-parser')

app.set('port', (process.env.PORT || 8080));
// app.use(express.static(staticRoot));
app.use(require('serve-static')(staticRoot));

app.use( bodyParser.json() );
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(require('cookie-parser')());

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// app.use(express.bodyParser());

MongoClient.connect("mongodb://user1:Aa123456@ds119370.mlab.com:19370/heroku_5kx4fdkl", function(err, db) {
// MongoClient.connect("mongodb://localhost:27017/main", function(err, db) {
  
  if(!err) {
    console.log("We are connected");
    db.createCollection("test",function(err,collection){console.log(collection)})
      var collection = db.collection('test');
      collection.insert({"sucess":true})
  }
  else{
    console.log(err);
  }
});
var url = 'mongodb://user1:Aa123456@ds119370.mlab.com:19370/heroku_5kx4fdkl'
// var url = 'mongodb://localhost:27017/main'
mongoose.connect(url);
var User = mongoose.model('User',
{
    username: String,
    password: String
});
User.remove({username:"user1"})
User.create({username:"user1",password:"password"})

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password != password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

app.post(
    '/login', 
    passport.authenticate('local'), 
    function(req, res)
    {
        res.send({token:true});
    }
);

app.post('/postush', function(req, res) {
    // var user_id = req.body.id;
    // var token = req.body.token;
    // var geo = req.body.geo;

    res.send(req.body);
});

// app.use(express.static(__dirname + '/public'));

app.get('/do', function(req,res,next){
    res.send("dodo")
})



/// DB query test
app.get('/try', function(req,res,next){
MongoClient.connect("mongodb://user1:Aa123456@ds119370.mlab.com:19370/heroku_5kx4fdkl", function(err, db) {  if(!err) {
    console.log("We are connected");
      var collection = db.collection('test');
      collection.insert({"sucess":true})
      collection.findOne({},function(err,item){res.send(item)});

  }
  else{
    console.log(err);
  }
});
})

/// Render index
app.use(function(req, res, next){
    // if the request is not html then move along
    var accept = req.accepts('html', 'json', 'xml');
    if(accept !== 'html'){
        return next();
    }
    // if the request has a '.' assume that it's for a file, move along
    var ext = path.extname(req.path);
    if (ext !== ''){
        return next();
    }
    // fs.createReadStream(staticRoot + 'index.html').pipe(res);
    fs.createReadStream('./dist/index.html').pipe(res);
});
///



/// Start listen on port
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
