var MongoClient = require('mongodb').MongoClient;
// var mongoUrl = 'mongodb://localhost:27017/BudgetDB';
var mongoUrl = 'mongodb://duribel:danieluribe52@budgetdb-shard-00-00-zuyzw.mongodb.net:27017,budgetdb-shard-00-01-zuyzw.mongodb.net:27017,budgetdb-shard-00-02-zuyzw.mongodb.net:27017/BudgetDB?ssl=true&replicaSet=BudgetDB-shard-0&authSource=admin';
var nodemailer = require('nodemailer');

//GET - Return all users in the DB
exports.findAllUsers = function (req, res) {
    MongoClient.connect(mongoUrl, function (err, db) {
        db.collection("User").find().toArray(function (err, result) {
            if (err) res.send(500, err.message);
            res.status(200).jsonp(result);
        });
    });
};

//GET - Return all users in the DB
exports.findUser = function (req, res) {
    var user = [{
        user: req.body.user
    }];
    if (req.body.pass) {
        user.push({
            pass: req.body.pass
        });
    }
    MongoClient.connect(mongoUrl, function (err, db) {
        db.collection("User").find({
            $and: user
        }).toArray(function (err, result) {
            if (err) res.send(500, err.message);
            res.status(200).jsonp(result);
        });
    });
};

// POST - save a user info sent by ajax call
exports.saveUser = function (req, res) {

    user = {
        name: req.body.name,
        lastName: req.body.lastName,
        user: req.body.user,
        pass: req.body.pass,
        email: req.body.email
    };

    MongoClient.connect(mongoUrl, function (err, db) {
        db.collection("User").insertOne(user, function (err, result) {
            if (err) res.send(500, err.message);
            sendUserEmail(user.name, user.email);
            res.status(200).jsonp(result);
        });
    });
};

function sendUserEmail(name, to) {
    console.log("1");
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        service: 'Gmail',
        auth: {
            user: 'dani.uribe25@gmail.com', // Your email id
            pass: 'iamthebest123' // Your password
        }
    });
    var htmlContent = "<div style='width:100px;height:100px;background:rgb(29, 172, 255)'>Buenos días " + name +" </div>";
    var mailOptions = {
        from: 'dani.uribe25@gmail.com', // sender address
        to: 'dani.uribe25@gmail.com', // list of receivers
        subject: 'BudgetApp wellcome', // Subject line
        text:  '',//, // plaintext body
        html: htmlContent
    };
    console.log("2");
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("3");
            console.log(error);
            return {
                state:"error",
                message:error
            };
        } else {
            console.log("4");
            console.log('Message sent: ' + info.response);
            return {
                state:"ok",
                message:info.response
            };
        };
    });
}