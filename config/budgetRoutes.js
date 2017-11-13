var express = require("express");

var budgetCtrl = require('../controllers/budgetController');
var routerBudget = express.Router();

routerBudget.route('/findAllBudgets')
    .post(budgetCtrl.findAllBudgets);

routerBudget.route('/saveBudget')
    .post(budgetCtrl.saveBudget);

routerBudget.route('/findBudget')
    .post(budgetCtrl.findBudget);

routerBudget.route('/removeBudget')
    .post(budgetCtrl.removeBudget);

routerBudget.route('/updateBudget')
    .post(budgetCtrl.updateBudget);

routerBudget.route('/setDefault')
    .post(budgetCtrl.setDefault);



module.exports = routerBudget;