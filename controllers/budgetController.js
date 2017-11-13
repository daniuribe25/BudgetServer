var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
// var mongoUrl = 'mongodb://localhost:27017/BudgetDB';
var mongoUrl = 'mongodb://duribel:danieluribe52@budgetdb-shard-00-00-zuyzw.mongodb.net:27017,budgetdb-shard-00-01-zuyzw.mongodb.net:27017,budgetdb-shard-00-02-zuyzw.mongodb.net:27017/BudgetDB?ssl=true&replicaSet=BudgetDB-shard-0&authSource=admin'; 


//GET - Return all user's budgets in the DB 
exports.findAllBudgets = function (req, res) {

    MongoClient.connect(mongoUrl, function (err, db) {
        db.collection("Budgets").find({
                'user_id': req.body.user_id
            })
            .toArray(function (err, result) {
                if (err) res.status(500).send(err.message);
                res.status(200).jsonp(result);
            });
    });
};

//POST - Return a budget by _id in the DB
exports.findBudget = function (req, res) {

    MongoClient.connect(mongoUrl, function (err, db) {
        db.collection("Budgets").find({
                _id: ObjectId(req.body._id)
            })
            .toArray(function (err, result) {
                if (err) res.status(500).send(err.message);
                res.status(200).jsonp(result);
            });
    });
};

// POST - save a budget info sent by ajax call
exports.updateBudget = function (req, res) {

    var budget = {
        'name': req.body.name,
        'description': req.body.description
    };

    var query = [{
        '_id': ObjectId(req.body._id)
    }, {
        $set: budget
    }];
    MongoClient.connect(mongoUrl, function (err, db) {
        db.collection("Budgets").update(query[0], query[1], function (err, result) {
            if (err) res.status(500).send(err.message);
            res.status(200).jsonp(result);
        });
    });
}

// POST - save a budget info sent by ajax call
exports.saveBudget = function (req, res) {
    var budget = {
        name: req.body.name,
        description: req.body.description,
        user_id: req.body.user_id,
        isDefault: false
    };

    MongoClient.connect(mongoUrl, function (err, db) {


        db.collection("Budgets").insertOne(budget, function (err, result) {
            if (err) res.status(500).send(err.message);
            res.status(200).jsonp(result);
        });
    });
};

// POST - remove a budget info sent by ajax call
exports.removeBudget = function (req, res) {


    MongoClient.connect(mongoUrl, function (err, db) {
        db.collection("Budgets").remove({
            _id: ObjectId( req.body._id)
        }, function (err, result) {
            if (err) res.status(500).send(err.message);
            res.status(200).jsonp(result);
        });
    });
};

// POST - set default budget to set displayed
exports.setDefault = function (req, res) {

    MongoClient.connect(mongoUrl, function (err, db) {
        db.collection("Budgets").update({}, {
            $set: {
                isDefault: false
            }
        }, {
            multi: true
        }, function (err, result) {
            if (err) res.status(500).send(err.message);
        });

        db.collection("Budgets").update({
            _id: ObjectId(req.body._id)
        }, {
            $set: {
                isDefault: true
            }
        }, function (err, result) {
            if (err) res.status(500).send(err.message);
            res.status(200).jsonp(result);
        });
    });
};