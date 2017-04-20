/// Imports
  var express = require('express'),
      path = require('path'),
      fs = require('fs'),
      cors = require('cors'),
      bodyParser = require('body-parser');
  var mongoose = require('mongoose'),
      Schema = mongoose.Schema
  var passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy;
  var crypto = require('crypto-js'),
      randomstring = require("randomstring");
  var promise = require('promise')
///

/// members
  var m_LoggedInUsers = [];
///

/// set express
  var staticRoot = __dirname + '/dist';
  app = express();
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

  var url = 'mongodb://user1:Aa123456@ds137370.mlab.com:37370/heroku_7djf2gbg'
  // var url = 'mongodb://localhost:27017/main'
  mongoose.connect(url);
  
  var UserModel = mongoose.model('User', {
    CompanyId: String,
    Role: Number,
    FirstName: String,
    LastName: String,
    ContactPhoneNumber: String,
    EmailAddress: String,
    Address: String,
    City: String,
    Country: String,
    Zip: String,
    MobileNumber: String,
    Status: Number,
    Username: String,
    Password: String,
    LifetimeRevenue: Number,
    Language: Number,
    BranchId: String,
    Notes: String
  });

  var CompanyModel = mongoose.model('Company', {
    Name: String,
    ContactName: String
  })
  
  var PlanSchema = new Schema({
    IssuedBy:String,
    CountryofUsage : String,
    PricePerDay:Number,
    NumberofMinutes : Number,
    AmountofData : Number,
    HighspeedData : Boolean,
    LocalText : Boolean,
    InternationalText : Boolean,
    ValidTill : Number,
    ActivatBy : Number,
    Note : String
  })

  var PlanModel = mongoose.model('Plan', PlanSchema)

  // Add branch
  var BranchModel = mongoose.model('branch', {
    Name: String,
    ManagerId: String
  })

  var TransactionSchema = new Schema({
    TimeStamp: Number,
    CompanyId: String,
    CreatorId: String,
    StartDate : Number,
    EndDate : Number,
    SimCardId : String,
    PhoneNumberId : String,
    PlanId:String,
    SimCard:{type: Schema.Types.ObjectId, ref: 'SimCard' },
    PhoneNumber:{type: Schema.Types.ObjectId, ref: 'PhoneNumber' },    
    Plan : {type: Schema.Types.ObjectId, ref: 'Plan' }

  })

  var TransactionModel = mongoose.model('Transaction', TransactionSchema)

  var SimCardSchema = new Schema({
    Type : Number,
    CompanyId : String,
    Status : Number,
    SimNumber : String,
    PhoneNumberId : String,
    PhoneNumber :{type: Schema.Types.ObjectId, ref: 'PhoneNumber' }
  })

  var SimCardModel = mongoose.model('SimCard', SimCardSchema)

  var PhoneNumberModel = mongoose.model('PhoneNumber', {
    Status : Number,
    Number : String,
    CompanyId : String,
    AttachedVDIDId : String,
    Type : Number,
    AttachedPhoneNumber : {type: Schema.Types.ObjectId, ref: 'PhoneNumber' }
  })



///

/// Populate DB
  // PlanModel.create({
  //   IssuedBy:"company",
  //   CountryofUsage : "Israel",
  //   NumberofMinutes : 500,
  //   AmountofData : 1024,
  //   HighspeedData : true,
  //   LocalText : true,
  //   InternationalText :false,
  //   ValidTill : Date.now(),
  //   ActivatBy : Date.now(),
  //   Note : "i am note"
  // }).then(
  // (res)=>{

  // },
  // (fail)=>{

  // })
  // CompanyModel.find({}).then((val) => {
  //   if (val.length === 0) {
  //     CompanyModel.create({ Name: "company1", ContactName: "user1" });
  //   }
  // })

  // // set company id in user
  // UserModel.find({}).then((val) => {
  //   if (val.length === 0) {
  //     UserModel.create({
  //       Username: "user1",
  //       Password: "password",
  //       Role:2
  //     });
  //   }
  // })

  // BranchModel.find({}).then(val => {
  //   if (val.length === 0) {
  //     UserModel.find({}).then((users) =>{
  //     var user = users[0];
  //       BranchModel.create({
  //         Name: "branch1",
  //         ManagerId: user._id
  //       })
  //     })
  //   }
  // })

  // // set company and user id in transacion
  // TransactionModel.find({}).then((val) => {
  //   if (val.length === 0) {
  //     UserModel.find({}).then((users) =>{
  //       var user = users[0];
  //       TransactionModel.create({
  //         TimeStamp: Date.now(),
  //         CompanyId: user.CompanyId,
  //         CreatorId: user._id
  //       });
  //     })
  //   }
  // })

  // TransactionModel.find({}).then((val) => {
  //   if (val.length === 0) {
  //     UserModel.find({}).then((users) =>{
  //       var user = users[0];
  //       TransactionModel.create({
  //         TimeStamp: Date.now(),
  //         CompanyId: user.CompanyId,
  //         CreatorId: user._id
  //       });
  //     })
  //   }
  // })

  // PhoneNumberModel.find({}).then((phones)=>{
  //   if (phones.length === 0) {
  //     CompanyModel.find({}).then((companies)=>{
  //       var company = companies[0];
  //       PhoneNumberModel.create({
  //         CompanyId : company._id,
  //         Number: "11111",
  //         Status:0,
  //         Type:0
  //       })
  //     })
  //   }
  // })

  // SimCardModel.find({}).then((val)=>{
    // if (val.length === 0) {
    //   PhoneNumberModel.find({}).then((phones)=>{
    //     var phone = phones[0];
    //     console.log
    //     SimCardModel.create({
    //       PhoneNumberId : phone._id,
    //       CompanyId : phone.CompanyId,
    //       SimNumber: "11111",
    //       Status:0,
    //       Type:0
    //     })
    //   })
    // }
  // })
///

/// set passport
  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
  passport.use(new LocalStrategy(
    function (username, password, done) {
      UserModel.findOne({ Username: username }, function (err, user) {
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
  app.post('/login', function (req, res, next) {
    passport.authenticate('local',
      function (err, user, info) {
        if (user) {
          var token = CreateUserSession(user)
          return res.send({ User: user, Success: true, token: token });
        }
        else {
          if (err) {
            return res.status(500).send({ Success: false, Error: err });
          }
          return res.status(401).send({ Success: false, Error: "Incorrect Username or Password" });
        }
      })(req, res, next);
  });

  app.get('/Transaction', function (req, res, next) {
    var token = req.query.token;
    var userData = GetUserPerToken(token);
    if(!userData){
      return res.status(401).send({error: "invalid Token"})
    }
    CreateTransactionSearch(userData.user).then((searchObject) => {
      // TransactionModel.find(searchObject).populate('SimCard').then(      
      TransactionModel.find(searchObject).populate({
          "path":'SimCard',
          "model":"SimCard",
          populate:{
            "path":'PhoneNumber',
            "model":"PhoneNumber",
            populate:{
              "path":'AttachedPhoneNumber',
              "model":"PhoneNumber"
            }
          }
        }).populate({"path":'Plan',"model":"Plan"}).then(
        (resolve) => {
          return res.send(resolve);
        },
        (reject) => {
          return res.status(500).send({ "error": reject });
        })
    })
  })

  app.put('/Transaction', function (req, res) {
    var token = req.body.token;
    var transacion = req.body.transaction;
    CheckIfTransactionValid(token).then(
      (resolve) => {
        CreateTransaction(transacion).then(
          (resolved)=>{
            return res.send({Success:true});
          },
          (rejected)=>{
            return res.status(rejected.status).send({error:rejected.error})
          })
      },
      (reject) => {
        var responseObject = ResolveInvalidTransactionRequest(reject);
        res.status(responseObject.status).send({error:status.err});  
    })
  })

  app.post('/GetPlans' , function(req,res){
    var token = req.body.token;
    var transacion = req.body.transaction;
    CheckIfTransactionValid(token).then(
      (resovle)=>{
        PlanModel.find().then(
          (resolve)=>{
            return res.send(resolve);
          },
          (reject)=>{
            return res.status(500).send({ 'error': reject})
          })
      },
      (reject)=>{
        return res.status(401).send({ 'error': "invalid token" })
      });
  })

  // refresh session via token
  app.post('/tokenLogin', function (req, res) {
    var userData = GetUserPerToken(req.body.token);
    if (userData) {
      tempUser = { User: userData.user, token: userData.token }
      ResetTimer(userData)
      return res.send(tempUser);
    }
    else {
      return res.status(401).send({ 'error': "invalid token" })
    }
  });

  app.post('/getFreeSims',function(req,res){
    var userData = GetUserPerToken(req.body.token);
    if(!userData){
      return res.status(401).send({'error':'invalid token'})
    }
    SimCardModel.find({CompanyId:userData.user.CompanyId,Status:0}).populate({"path":'PhoneNumber',"model":"PhoneNumber"}).then(
      (resolved)=>{
        res.send(resolved);
      },
      (rejected)=>{
        res.status(500).send({'error':'somthing went wrong'});
      })

  })

  app.post('/getFreePhones',function(req,res){
  
    var userData = GetUserPerToken(req.body.token);
    var type;
    if(req.body.isVDID){
      type = 1;
    }
    else {
      type = 0
    }

    if(!userData){
      return res.status(401).send({'error':'invalid token'})
    }

    PhoneNumberModel.find({CompanyId:userData.user.CompanyId,Status:0,Type:type})
    .populate({"path":'AttachedPhoneNumber',"model":"PhoneNumber"}).then(
      (resolved)=>{
        return res.send(resolved);
      },
      (rejected)=>{
        return res.status(500).send({'error':'somthing went wrong'});
      })
  })

  // validate Login
  app.get('/isLoggedIn', function (req, res, next) {
    var user = GetUserPerToken(req.query.token);
    if (user) {
      ResetTimer(user);
      res.send(true);
    }
    else {
      res.send(false);
    }
  })

  // Http test
  app.get('/do', function (req, res, next) {
    res.send("dodo")
  })

///

/// Render Website
  app.use(function (req, res, next) {
    // if the request is not html then move along
    var accept = req.accepts('html', 'json', 'xml');
    if (accept !== 'html') {
      return next();
    }
    // if the request has a '.' assume that it's for a file, move along
    var ext = path.extname(req.path);
    if (ext !== '') {
      return next();
    }
    // fs.createReadStream(staticRoot + 'index.html').pipe(res);
    fs.createReadStream('./dist/index.html').pipe(res);
  });
///

/// Deploy app on port
  app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
  });
///

/// functions

  function CreateTransaction(transacion){
    return new Promise((resolve, reject) =>{
      TransactionModel.create(transacion).then(
        (entered) => {
          var simData = {"PhoneNumber" : transacion.PhoneNumberId,"Status":1, "PhoneNumberId":transacion.PhoneNumberId}
          SimCardModel.findByIdAndUpdate(entered.SimCardId,simData).then(
            (resolved)=>{
              var phoneData = {"Status":1,AttachedPhoneNumber:transacion.AttachedPhoneNumberId}
              PhoneNumberModel.findByIdAndUpdate(transacion.PhoneNumberId,phoneData).then(
                (phoneResolved)=>{
                  //TODO: set VDID as used
                resolve();                
              },(phoneRejected)=>{
                reject({ status: 500, error : phoneRejected})              ;
              })
            },
            (rejected)=>{
              reject({ status: 500, error : rejected})              
            }) 
        },
        (failedToEnter) => {
          reject({ status: 500, error : failedToEnter})              
      })
    })
  }

  function ResolveInvalidTransactionRequest(error){
    if (error  == "InvalidToken") {
      return {status:401,error: "invalid Token"}
    }
  }  

  function CheckIfTransactionValid(token) {
    return new Promise((resolve, reject) => {
      user = GetUserPerToken(token)
      if (!user) {
        reject("InvalidToken");
      }
      else {
        resolve()
      }
    })
  }

  function IsTokenPresent(token) {
    var isLoggedIn = false;
    for (var i = 0; i < m_LoggedInUsers.length; i++) {
      if (token == m_LoggedInUsers[i].token) {
        isLoggedIn = true;
      }
    }
    return isLoggedIn;
  }

  function GetUserPerToken(token) {
    for (var i = 0; i < m_LoggedInUsers.length; i++) {
      if (token == m_LoggedInUsers[i].token) {
        return m_LoggedInUsers[i];
      }
    }
    return null;
  }

  function RemoveUser(user) {
    var index = m_LoggedInUsers.indexOf(user);
    m_LoggedInUsers.splice(index, 1);
  }

  function CreateUserSession(user) {
    user.Password = null;
    var token = randomstring.generate(256);
    var position = m_LoggedInUsers.push({ user: user, token: token }) - 1;
    ResetTimer(m_LoggedInUsers[position])
    return token;
  }

  function ResetTimer(user) {
    if (typeof (user.tokenTimeout) !== 'undefined') {
      clearTimeout(user.tokenTimeout);
    }
    user.tokenTimeout = setTimeout(RemoveUser, 1200000, user);
  }

  function CreateTransactionSearch(user) {
    return new Promise((resolve, reject) => {
      // if global manager, view all transacion      
      if (user.Role == 0) {
        resolve({});
      }
      // if company manager, view all transactions from company
      if (user.Role == 1) {
        var users = UserModel.find({ "CompanyId": user.CompanyId }).then((result) => {
          var ids = GetUsersIdsForUsers(result);
          var search = { CreatorId: { $in: ids } };
          resolve(search);
        })
      }

      // if branch manager, find all users in branch, and get all of thire transactions
      if (user.Role == 2) {
        var users = UserModel.find({ "BranchId": user.BranchId }).then((result) => {
          var ids = GetUsersIdsForUsers(result);
          var search = { CreatorId: { $in: ids } };
          resolve(search);
        })
      }

      // if regular user, transactions with user id
      if (user.Role == 3) {
        resolve({ CreatorId: user.id })
      }
    })

  }

  function GetUsersIdsForUsers(users) {
    var ids = []
    for (var i = 0; i < users.length; i++) {
      ids.push(users[i].id)
    }
    return ids;
  }
/// 