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

  var promise = require('promise')
///

/// members
  var m_LoggedInUsers = [];
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
  MongoClient.connect("mongodb://user1:Aa123456@ds119370.mlab.com:19370/heroku_5kx4fdkl", function(err, db) {
  // MongoClient.connect("mongodb://localhost:27017/main", function(err, db) {
    if(!err) {
      console.log("Connected to DB");
      db.createCollection("test",function(err,collection){/*console.log(collection)*/})
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

  //TODO: create companies schema
  //      add company id to user
  //      add user privliges
  
  var UserModel = mongoose.model('User',{
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

  var CompanyModel = mongoose.model('Company',{
    Name:String,
    ContactName:String
  })

  // Add branch
  var BranchModel = mongoose.model('branch',{
    Name:String,
    ManagerId:String
  })

  var TransactionModel = mongoose.model('Transaction',{
    TimeStamp : Number,
    CompanyId: String,
    CreatorId : String
  })

///

/// Populate DB
  CompanyModel.find({}).then((val)=>{
    if(val.length === 0)
    {
      CompanyModel.create({Name:"company1",ContactName:"user1"});
    }
  })

  // set company id in user
  UserModel.find({}).then((val)=>{
      if(val.length === 0)
      {
        UserModel.create({
          Username:"user1",
          Password:"password"
        });
      }
  })

  
  BranchModel.find({}).then(val =>{
    if(val.length === 0)
    {
      BranchModel.create({
        Name:"branch1",
        ManagerId:"58c5e4a7f360ba1de87f942d"
      })
    }
  })
    
  // set company and user id in transacion
  TransactionModel.find({}).then((val)=>{
    if(val.length === 0)
    {
      TransactionModel.create({
        TimeStamp:Date.now(),
        CompanyId:"58cbffe18df9d72be44ec5e2",
        CreatorId:"58c5e4a7f360ba1de87f942d"
      });
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
      UserModel.findOne({ Username: username }, function(err, user) {
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
        var token = CreateUserSession(user)
        return res.send({User:user,Success:true,token:token});
      }
      else{
        if(err)
        {
          return res.status(500).send({Success:false,Error:err});
        }
        return res.status(401).send({Success:false,Error:"Incorrect Username or Password"});
      }
    })(req, res, next);
  });

  app.get('/Transaction',function(req,res,next){
    var token = req.query.token;
    var userData = GetUserPerToken(token);
    CreateTransactionSearch(userData.user).then((searchObject)=>{
      TransactionModel.find(searchObject).then(
      (resolve)=>{
        return res.send(resolve);
      },
      (reject)=>{
        return res.status(500).send({"error":reject});
      })
    })
  })
  
  app.put('/Transaction',function(req,res){
    var token = req.body.token;
    var transacion = req.body.transacion;
    CheckIfTransactionValid(token).then((resolve)=>
    {
      TransactionModel.create(transacion).then(
        (entered)=>{
          return res.send({success:true})
        },
        (failedToEnter)=>
        {
          return res.status(500).send({success:false})
        })
    },
    (reject)=>{
      if(reject == "InvalidToken"){
        return res.status(401).send({error:"invalid Token"})
      }
      return res.status(400).send({success:false})
    })
  })

  // refresh session via token
  app.post('/tokenLogin',function(req, res) {
    var userData = GetUserPerToken(req.body.token);
    if (userData)
    {
      tempUser = {User:userData.user, token:userData.token}
      ResetTimer(userData)
      return res.send(tempUser);
    }
    else
    {
      return res.status(401).send({'error':"invalid token"})
    }
  });

  // validate Login
  app.get('/isLoggedIn',function(req,res,next){
    var user = GetUserPerToken(req.query.token);
    if(user){
      ResetTimer(user);
      res.send(true);
    }
    else{
      res.send(false);
    }
  })

  // Http test
  app.get('/do',function(req,res,next){
      res.send("dodo")
  })

  // DB query test
  app.get('/try', function(req,res,next){
    MongoClient.connect("mongodb://user1:Aa123456@ds119370.mlab.com:19370/heroku_5kx4fdkl",
    // MongoClient.connect("mongodb://localhost:27017/main",
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

/// functions

  function CheckIfTransactionValid(token)
  {
    return new Promise((resolve,reject)=>{
      user = GetUserPerToken(token)
      if(!user)
      {
        reject("InvalidToken");
      }
      resolve()
    })
  }

  function IsTokenPresent(token){
    var isLoggedIn = false;    
    for(var i = 0; i < m_LoggedInUsers.length; i++)
    {
      if(token == m_LoggedInUsers[i].token)
      {
        isLoggedIn = true;
      }
    }
    return isLoggedIn;
  }

  function GetUserPerToken(token){
    for(var i = 0; i < m_LoggedInUsers.length; i++)
    {
      if(token == m_LoggedInUsers[i].token)
      {
        return m_LoggedInUsers[i];
      }
    }
    return null;
  }

  function RemoveUser(user){
    var index = m_LoggedInUsers.indexOf(user);
    m_LoggedInUsers.splice(index, 1);
  }  

  function CreateUserSession(user){
    user.Password = null;
    var token = randomstring.generate(256); 
    var position = m_LoggedInUsers.push({user:user, token: token}) - 1;
    ResetTimer(m_LoggedInUsers[position])
    return token;
  }

  function ResetTimer(user){
    if(typeof(user.tokenTimeout) !== 'undefined')
    {
      clearTimeout(user.tokenTimeout);
    }
    user.tokenTimeout = setTimeout(RemoveUser, 120000, user);
  }

  function CreateTransactionSearch(user){
    return new Promise((resolve,reject)=>{
     // if global manager, view all transacion      
      if (user.Role == 0 ){
        resolve({});
      }
      // if company manager, view all transactions from company
      if (user.Role == 1){
        var users = UserModel.find({"CompanyId":user.CompanyId}).then((result)=>{
          var ids = GetUsersIdsForUsers(result);
          var search = {CreatorId:{ $in: ids }};
          resolve(search);
        })
      }
      
      // if branch manager, find all users in branch, and get all of thire transactions
      if (user.Role == 2){
          var users = UserModel.find({"BranchId":user.BranchId}).then((result)=>{
            var ids = GetUsersIdsForUsers(result);
            var search = {CreatorId:{ $in: ids }};
            resolve( search);
        })
      }
      
      // if regular user, transactions with user id
      if (user.Role == 3){
        resolve({CreatorId: user.id})
      }
    })

  }

  function GetUsersIdsForUsers(users){
    var ids = []
    for(var i=0;i < users.length;i++)
    {
      ids.push(users[i].id)
    }
    return ids;
  }
/// 