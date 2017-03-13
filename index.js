/// Imports
  var express = require('express'),
      path = require('path'),
      fs = require('fs'),
      cors = require('cors'),
      bodyParser = require('body-parser');
      
  var MongoClient = require('mongodb').MongoClient;
  var mongoose = require('mongoose');

  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy;

  var crypto = require('crypto-js'),
      randomstring = require("randomstring");

///

/// members
  var loggedInUsers = [];
///

/// set express
  var staticRoot = __dirname + '/dist';
  app = express()  ;
  app.set('port', (process.env.PORT || 8080));
  app.use(require('serve-static')(staticRoot));
  app.use(bodyParser.json());
  app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }));
  app.use(require('cookie-parser')());
    // Allow cors on app
  app.use(cors())
///

/// Connect to mongo
  // MongoClient.connect("mongodb://user1:Aa123456@ds119370.mlab.com:19370/heroku_5kx4fdkl", function(err, db) {
  MongoClient.connect("mongodb://localhost:27017/main", function(err, db) {
    if(!err) {
      console.log("We are connected");
      db.createCollection("test",function(err,collection){/*console.log(collection)*/})
      var collection = db.collection('test');
      collection.insert({"sucess":true})
    }
    else{
      console.log(err);
    }
  });

  // var url = 'mongodb://user1:Aa123456@ds119370.mlab.com:19370/heroku_5kx4fdkl'
  var url = 'mongodb://localhost:27017/main'
  mongoose.connect(url);
  var User = mongoose.model('User',{
    CompanyId:String,
    Role : Number,
    FirstName : String,
    LastName : String,
    ContactPhoneNumber : String,
    EmailAddress:String,
    Address:String,
    City:String,
    Country:String,
    Zip:String,
    MobileNumber:String,
    Status : Number,
    Username : String,
    Password : String,
    LifetimeRevenue : Number,
    Language : Number,
    BranchId:String,
    Notes : String
  });
  User.find({}).then(
    (val)=>
    {
      if(val ===0)
      {
        User.create({Username:"user1",Password:"password"});
      }
      else{
        console.log(val);
      }
    })
  
///

/// set passport
  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ Username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (user.Password != password) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));
///

/// Exposed methods

  // Perform Login
  app.post('/login', function(req, res, next) {
    passport.authenticate('local',
    function(err, user, info) 
    {
      if(user)
      {
        euser = user;
        euser.Password = null;
        var token = randomstring.generate(256);
        loggedInUsers.push({user:euser, token: token});
        console.log(token);
        return res.send({User:euser,Success:true,token:"abc"});
      }
      else
      {
        if(err)
        {
          return res.status(500).send({Success:false,Error:err});
        }
        return res.status(401).send({Success:false,Error:"Incorrect Username or Password"});
      }
    })(req, res, next);
  });

  // validate Login
  app.get('/isLoggedIn',function(req,res,next){
    console.log(req.query)
    var isLoggedIn = false;
    for(var i = 0; i < loggedInUsers.length; i++)
    {
      if(req.query.token == loggedInUsers[i].token)
      {
        isLoggedIn = true;
      }
    }
    res.send(isLoggedIn)
  })

  // Http test
  app.get('/do',function(req,res,next){
      res.send("dodo")
  })

  // DB query test
  app.get('/try', function(req,res,next){
    // MongoClient.connect("mongodb://user1:Aa123456@ds119370.mlab.com:19370/heroku_5kx4fdkl",
    MongoClient.connect("mongodb://localhost:27017/main",
    function(err, db)
    { 
      if(!err) 
      {
        console.log("We are connected");
        var collection = db.collection('test');
        collection.insert({"sucess":true})
        collection.findOne({"sucess":true},function(err,item){res.send(item)});
      }
      else
      {
        console.log(err);
      }
    });
  })


  
///

/// Render Website
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

/// Deploy app on port

  app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
  });
///
